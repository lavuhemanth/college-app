import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TodoService } from "../todo.service";
import { FormControl, FormBuilder } from "@angular/forms";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { SpinnerService } from "../spinner.service";

// import { ImageCompressor } from "image-compressor";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.css"],
})
export class ImageUploadComponent implements OnInit {
  fileData;
  isImageUploaded = false;
  onError = true;
  selectFile: File = null;
  imageData = {};
  requestUrl = `${environment.serviceUrl}/api/imageUpload`;

  constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<ImageUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: SpinnerService
  ) {}

  async onChangeFile(event) {
    this.isImageUploaded = true;
    this.selectFile = <File>event.target.files[0];
    const mimeType = this.selectFile.type;
    if (this.selectFile.size > 409600) {
      this.data.error = "File must be less then 50KB";
      this.onError = true;
      this.isImageUploaded = false;
      return;
    } else if (mimeType.match(/image\/*/) == null) {
      this.data.error = "Only images are supported.";
      this.onError = true;
      this.isImageUploaded = false;
      return;
    } else {
      this.data.error = "";
      this.onError = false;
      if (this.selectFile.name) {
        this.spinner.changeStatus(true, true);
        const fd = new FormData();
        fd.append("image", this.selectFile, this.selectFile.name);
        this.http.post<any>(this.requestUrl, fd).subscribe((response) => {
          this.spinner.changeStatus(false, false);
          if (response) {
            this.data.profileUrl =
              environment.serviceUrl + "/" + response.profileUrl;
            this.data.imageUrl = response.profileUrl;
          }
        });
      }
      // await this.compress(event);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
