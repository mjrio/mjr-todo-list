import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListApiService {
  private readonly baseUrl: string = 'http://localhost:5166';

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.baseUrl}/todos`);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(`${this.baseUrl}/todos`, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(`${this.baseUrl}/todos/${todo.id}`, todo);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.delete<Todo>(`${this.baseUrl}/todos/${todo.id}`)
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
