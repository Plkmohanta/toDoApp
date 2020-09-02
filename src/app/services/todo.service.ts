import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Todo } from "../model/Todo";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  apiURL = "http://localhost:8000/todos";

  constructor(private http: HttpClient) {}

  getAllTodo(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(this.apiURL)
      .pipe(retry(1), catchError(this.handleError));
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(this.apiURL, todo)
      .pipe(retry(1), catchError(this.handleError));
  }

  editTodo(id: any, todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(this.apiURL + "/" + id, todo)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteTodo(id): Observable<Todo> {
    return this.http
      .delete<Todo>(this.apiURL + "/" + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
