import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

import { ImageUploadComponent } from "../image-upload/image-upload.component";
import { TodoService } from "../todo.service";
import { ActivatedRoute } from "@angular/router";
import { SpinnerService } from "../spinner.service";

@Component({
  selector: "app-college-form",
  templateUrl: "./college-form.component.html",
  styleUrls: ["./college-form.component.css"],
})
export class CollegeFormComponent implements OnInit {
  collegeForm: FormGroup;
  submitted = false;
  imageUploadError: String;
  todoId: String;
  collegeFormData: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: SpinnerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.todoId = params["id"];
      if (this.todoId) {
        this.getTodoDataById(this.todoId);
      }
    });
    this.collegeForm = this.formBuilder.group({
      name: ["", Validators.required],
      code: ["", Validators.required],
      location: ["", Validators.required],
      country: ["", Validators.required],
      students: new FormArray([]),
    });
  }

  get f() {
    return this.collegeForm.controls;
  }
  get s() {
    return this.f.students as FormArray;
  }

  onAddStudent() {
    this.s.push(
      this.formBuilder.group({
        name: ["", Validators.required],
        rollId: ["", Validators.required],
        branch: ["", Validators.required],
        section: ["", Validators.required],
        pic: [""],
      })
    );
  }

  removeStudent(index) {
    this.s.removeAt(index);
  }

  onReset() {
    this.submitted = false;
    this.collegeForm.reset();
    this.s.reset();
  }

  onClear() {
    this.submitted = false;
    this.s.reset();
  }

  openDialog(i): void {
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      width: "250px",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.s.value[i].pic = result.imageUrl;
    });
  }

  onSubmit(event) {
    this.spinner.changeStatus(true, true);
    event.preventDefault();
    if (this.collegeForm.invalid) {
      return;
    }

    if (this.todoId) {
      this.todoService
        .update(this.todoId, this.collegeForm.value)
        .subscribe((response) => {
          this.spinner.changeStatus(false, false);
          this.router.navigate(["/"]);
        });
    }
    this.todoService.create(this.collegeForm.value).subscribe((response) => {
      this.spinner.changeStatus(false, false);
      this.router.navigate(["/"]);
    });
  }

  getTodoDataById(id) {
    this.spinner.changeStatus(true, true);
    this.todoService.getTask(id).subscribe(({ task }) => {
      this.spinner.changeStatus(false, false);
      // delete task["_id"];
      this.collegeFormData = task;
      this.collegeFormData.students.forEach((student) => {
        this.onAddStudent();
      });
      this.collegeForm.patchValue({
        ...this.collegeFormData,
      });
    });
  }
}
