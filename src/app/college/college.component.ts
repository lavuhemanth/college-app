import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo.service";
import { environment } from "src/environments/environment";
import { SpinnerService } from "../spinner.service";

@Component({
  selector: "app-college",
  templateUrl: "./college.component.html",
  styleUrls: ["./college.component.css"],
})
export class CollegeComponent implements OnInit {
  isOpen: Boolean = false;
  panelOpenState = false;
  domainUrl = environment.serviceUrl + "/";

  displayedColumns: string[] = ["pic", "name", "rollId", "branch", "section"];
  colleges = [];
  constructor(
    private todoService: TodoService,
    private spinner: SpinnerService
  ) {}

  openCreateForm() {
    this.isOpen = !this.isOpen;
    console.log("Is Open", this.isOpen);
  }
  ngOnInit() {
    this.spinner.changeStatus(true, true);
    this.getTasks();
  }

  getTasks() {
    this.todoService.getTasks().subscribe(({ tasks }) => {
      this.spinner.changeStatus(false, false);
      this.colleges = tasks;
    });
  }

  deleteCollege(id) {
    this.spinner.changeStatus(true, true);
    this.todoService.deleteTask(id).subscribe((response) => {
      this.spinner.changeStatus(false, false);
      this.getTasks();
    });
  }
}
