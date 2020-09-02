import { Component, OnInit } from "@angular/core";
import { TodoService } from "../services/todo.service";
import { Todo } from "../model/Todo";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { TodoEditComponent } from "./todo-edit/todo-edit.component";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private todoService: TodoService, public dialog: MatDialog) {}
  todoList: Todo[];
  ngOnInit() {
    this.getAllTodoList();
  }
  getAllTodoList() {
    this.todoService.getAllTodo().subscribe(data => {
      this.todoList = data;
    });
  }
  addTodo() {
    const dialogData = {
      mode: "add"
    };
    const dialogRef = this.dialog.open(TodoEditComponent, {
      width: "90%",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === "successful") {
        this.getAllTodoList();
      }
    });
  }
  editTodo(currentTodo) {
    const dialogData = {
      mode: "edit",
      title: currentTodo.title,
      text: currentTodo.text,
      id: currentTodo.id
    };
    const dialogRef = this.dialog.open(TodoEditComponent, {
      width: "90%",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === "successful") {
        this.getAllTodoList();
      }
    });
  }
  delete(todoId) {
    this.todoService.deleteTodo(todoId).subscribe(data => {
      this.getAllTodoList();
    });
  }
}
