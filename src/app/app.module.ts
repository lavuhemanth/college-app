import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { CollegeComponent } from "./college/college.component";
import { CollegeFormComponent } from "./college-form/college-form.component";
import { ImageUploadComponent } from "./image-upload/image-upload.component";

import { TodoService } from "./todo.service";
import { SpinnerService } from "./spinner.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CollegeComponent,
    CollegeFormComponent,

    ImageUploadComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [ImageUploadComponent],
  providers: [TodoService, SpinnerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
