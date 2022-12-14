import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { Diagnostics, Todo, TodoListApiService } from './todo-list-api.service';

@Component({
  selector: 'app-root',
  template: `
  <header>
    <h1>Todo list</h1>
  </header>

  <section>
    <h2>Create to do</h2>
    <p>Use the form below to create a new to do.</p>
    <form>
      <label for="description">Description</label>
      <input type="text" id="description" name="description" [(ngModel)]="description"/>
      <input type="submit" [disabled]="!description.length" (click)="createTodo()"/>
    </form>
  </section>

  <hr>

  <section>
    <h2>Your to do's</h2>
    <ng-container *ngIf="todos$ | async as todos; else noTodos">
      <table *ngIf="todos.length; else noTodos">
        <tr *ngFor="let todo of todos">
          <td [class.done]="todo.isDone">{{ todo.description }}</td>
          <td>
            <button (click)="markDone(todo)" [disabled]="todo.isDone">Mark done</button>
            <button (click)="deleteTodo(todo)">Delete</button>
          </td>
        </tr>
      </table>
    </ng-container>
    <ng-template #noTodos>
      <p>There's nothing to do...</p>
    </ng-template>
  </section>

  <hr>

  <section>
    <h2>Create report</h2>
    <p>Click the button below to create a new report.</p>
    <button type="submit" (click)="createReport()">Create report</button>
  </section>

  <footer>
    <ng-container *ngIf="diagnostics$ | async as diagnostics">
      API hostname: {{ diagnostics.hostname }} | DB provider: {{ diagnostics.databaseProvider }}
    </ng-container>
  </footer>
  `,
  styles: []
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private refresh$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  
  public todos$: Observable<Todo[]> | undefined;
  public diagnostics$: Observable<Diagnostics> | undefined;

  public description: string = "";

  constructor(private todoListApiService: TodoListApiService) {
  }

  ngOnInit(): void {
    this.todos$ = this.refresh$.pipe(switchMap(() => this.todoListApiService.getTodos()));
    this.diagnostics$ = this.refresh$.pipe(switchMap(() => this.todoListApiService.getDiagnostics()));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  createTodo(): void {
    let todo = new Todo(this.description, false);

    this.subscriptions.add(this.todoListApiService.createTodo(todo).subscribe({
      next: () => { this.description = ""; this.refresh$.next(true); },
      error: () => alert("Failed to create to do. Please try again later.")
    }));
  }

  markDone(todo: Todo): void {
    this.subscriptions.add(this.todoListApiService.updateTodo({ ...todo, isDone: true }).subscribe({
      next: () => this.refresh$.next(true),
      error: () => alert("Failed to mark to do as done. Please try again later.")
    }));
  }

  deleteTodo(todo: Todo): void {
    this.subscriptions.add(this.todoListApiService.deleteTodo(todo).subscribe({
      next: () => this.refresh$.next(true),
      error: () => alert("Failed to delete to do. Please try again later.")
    }));
  }

  createReport(): void {
    this.subscriptions.add(this.todoListApiService.createReport().subscribe({ 
      next: () => alert("Report successfully created!"), 
      error: () => alert("Failed to create report. Please try again later.")
    }));
  }
}
