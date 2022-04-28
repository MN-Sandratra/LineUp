import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor(private http: HttpClient) { }
  baseUrl=environment.baseUrl;

  addFiles(images: File) {
    var arr:any[] = []
    var formData = new FormData();
    arr.push(images);

    arr[0].forEach((item:any, i:any) => {
      formData.append('avatar', arr[0][i]);
    })

    return this.http.post(this.baseUrl+'/api/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
