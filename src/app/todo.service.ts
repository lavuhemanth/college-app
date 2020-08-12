import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TodoService {
  requestUrl: string;
  private baseurl: string = environment.serviceUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    // this.snackBar.openSnackBar('Something bad happened; please try again later.', 'ok');
    return throwError("Something bad happened; please try again later.");
  }

  create(taskObject: any) {
    this.requestUrl = `${this.baseurl}/api/task`;

    return this.http.post<any>(this.requestUrl, taskObject, httpOptions).pipe(
      map(
        (response) => {
          return response;
        },
        (error) => {
          console.log("Error ocurred in taskCreation " + error);
        }
      ),
      catchError(this.handleError)
    );
  }

  update(id, taskObject: any) {
    this.requestUrl = `${this.baseurl}/api/task/${id}`;

    return this.http.put<any>(this.requestUrl, taskObject, httpOptions).pipe(
      map(
        (response) => {
          return response;
        },
        (error) => {
          console.log("Error ocurred in taskCreation " + error);
        }
      ),
      catchError(this.handleError)
    );
  }

  getTasks() {
    this.requestUrl = `${this.baseurl}/api/task`;

    return this.http.get<any>(this.requestUrl, httpOptions).pipe(
      map(
        (response) => {
          return response;
        },
        (error) => {
          console.log("Error ocurred in get all tasks " + error);
        }
      ),
      catchError(this.handleError)
    );
  }

  deleteTask(id) {
    this.requestUrl = `${this.baseurl}/api/task/${id}`;

    return this.http.delete(this.requestUrl).pipe(
      map(
        (response) => {
          return response;
        },
        (error) => {
          console.log("Delete task" + error);
        }
      ),
      catchError(this.handleError)
    );
  }

  getTask(id) {
    this.requestUrl = `${this.baseurl}/api/task/${id}`;

    return this.http.get<any>(this.requestUrl, httpOptions).pipe(
      map(
        (response) => {
          return response;
        },
        (error) => {
          console.log("Get task by id" + error);
        }
      ),
      catchError(this.handleError)
    );
  }
}
