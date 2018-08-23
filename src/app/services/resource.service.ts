import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private serverUrl: string = 'http://10.87.182.125:8080/athena-service/api/clinicalservice';

  constructor(private httpClient: HttpClient) { }

  getVitalSigns(ehrId: string, patientId: string): Observable<string> {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    httpOptions.headers.append("Access-Control-Allow-Methods", "GET");

    const url = `${this.serverUrl}/${ehrId}/getvitalsigns/${patientId}`;
    console.log("getVitalSigns URL " + url)

    return this.httpClient.get(url, { responseType: 'text' }).pipe(tap(data => console.log(data)), catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }
    return throwError(new Error('There is a problem with the application. Please contact the support team !!'));
  }

}
