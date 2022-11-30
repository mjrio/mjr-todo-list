import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListApiService {
  constructor(private httpClient: HttpClient) {
  }

  getUrl(): Observable<string> {
    return this.httpClient.get('assets/config.json').pipe(map(config =>
      ((config as any).todoApi as any).url as string
    ));
  }

  getDiagnostics(): Observable<Diagnostics> {
    return this.getUrl().pipe(switchMap(apiUrl => this.httpClient.get<Diagnostics>(`${apiUrl}/diagnostics`)))
  }

  getTodos(): Observable<Todo[]> {
    return this.getUrl().pipe(switchMap(apiUrl => this.httpClient.get<Todo[]>(`${apiUrl}/todos`)));
  }

  getTodo(todo: Todo): Observable<Todo> {
    return this.getUrl().pipe(switchMap(apiUrl => this.httpClient.get<Todo>(`${apiUrl}/todos/${todo.id}`)));
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.getUrl().pipe(switchMap(apiUrl => this.httpClient.post<Todo>(`${apiUrl}/todos`, todo)));
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.getUrl().pipe(switchMap(apiUrl => this.httpClient.put<Todo>(`${apiUrl}/todos/${todo.id}`, todo)));
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.getUrl().pipe(switchMap(apiUrl => this.httpClient.delete<Todo>(`${apiUrl}/todos/${todo.id}`)));
  }

  createReport(): Observable<void> {
    return this.getUrl().pipe(switchMap(apiUrl => this.httpClient.post<void>(`${apiUrl}/reports`, { })));
  }
}

export class Todo {
  constructor(description: string, isDone: boolean) {
    this.description = description;
    this.isDone = isDone;
  }

  id: number | undefined;
  description: string;
  isDone: boolean;
}

export class Diagnostics {
  constructor(hostname: string, databaseProvider: string) {
    this.hostname = hostname;
    this.databaseProvider = databaseProvider;
  }

  hostname: string;
  databaseProvider: string;
}
