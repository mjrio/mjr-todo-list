import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { todoApi } from '../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class TodoListApiService {

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${todoApi.url}/todos`);
  }

  getTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.get<Todo>(`${todoApi.url}/todos/${todo.id}`);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>(`${todoApi.url}/todos`, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(`${todoApi.url}/todos/${todo.id}`, todo);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.delete<Todo>(`${todoApi.url}/todos/${todo.id}`)
  }

  createReport(): Observable<void> {
    return this.httpClient.post<void>(`${todoApi.url}/reports`, { });
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
