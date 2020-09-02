import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TodoService } from "src/app/services/todo.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-todo-edit",
  templateUrl: "./todo-edit.component.html",
  styleUrls: ["./todo-edit.component.scss"]
})
export class TodoEditComponent implements OnInit {
  todoForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    public dialogRef: MatDialogRef<TodoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: [""],
      text: [""]
    });
    if (this.data.mode === "edit") {
      this.patchTodo();
    }
  }

  patchTodo() {
    this.todoForm.patchValue({
      title: this.data.title,
      text: this.data.text
    });
  }
  onSubmit() {
    if (this.data.mode === "edit") {
      this.todoService
        .editTodo(this.data.id, this.todoForm.value)
        .subscribe(data => {
          this.dialogRef.close("successful");
        });
    } else {
      this.todoService.addTodo(this.todoForm.value).subscribe(data => {
        this.dialogRef.close("successful");
      });
    }
  }
}
