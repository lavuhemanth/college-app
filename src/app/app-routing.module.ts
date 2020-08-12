import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CollegeComponent } from "./college/college.component";
import { CollegeFormComponent } from "./college-form/college-form.component";

const routes: Routes = [
  { path: "", component: CollegeComponent },
  { path: "todo", component: CollegeFormComponent },
  { path: "todo/:id", component: CollegeFormComponent },
  { path: "**", pathMatch: "full", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
