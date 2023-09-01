// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// Environment
import { environment as env } from '../../../../environments/environment';

@Injectable()
export class RestApiClient {

	constructor(private http: HttpClient) { }

	get<T>(
		options: {
			endPoint: string,
			headers?: HttpHeaders | {
				[header: string]: string | string[]
			},
			params?: HttpParams | {
				[param: string]: string | string[];
			};
			useLocal?:boolean;
			microservice?: string;
		}) {
        return this.http.get<T>(
            env.hostname + options.endPoint, {
            headers: options.headers ? options.headers : new HttpHeaders({
                'Accept': 'application/json'
            }),
            params: options.params ? options.params : undefined,
            observe: 'response'
        }).pipe(
            retry(0),
            catchError(this.handleError)
        );
	}

	getBlob(
		options: {
			endPoint: string,
			headers?: HttpHeaders | {
				[header: string]: string | string[]
			},
			params?: HttpParams | {
				[param: string]: string | string[];
			};
			useLocal?:boolean;
			microservice?: string;
		}): Observable<HttpResponse<Blob>> {
		return this.http.get(
			env.hostname + options.endPoint, {
			headers: options.headers ? options.headers : new HttpHeaders({
				'Content-Type': 'application/json'
			}),
			params: options.params ? options.params : undefined,
			observe: 'response',
			responseType: 'blob'
		}).pipe(
			retry(0),
			catchError(this.handleError)
		);
	}

	getImage(
		options: {
			endPoint: string,
			headers?: HttpHeaders | {
				[header: string]: string | string[]
			},
			params?: HttpParams | {
				[param: string]: string | string[];
			};
			useLocal?:boolean;
			microservice?: string;
		}): Observable<HttpResponse<Blob>> {
		return this.http.get(
			env.hostname + options.endPoint, {
			headers: options.headers ? options.headers : new HttpHeaders({
				'Accept': 'application/octet-stream'
			}),
			params: options.params ? options.params : undefined,
			observe: 'response',
			responseType: 'blob'
		}).pipe(
			retry(0),
			catchError(this.handleError)
		);
	}

	post<T>(
		body: any,
		options: {
			endPoint: string,
			headers?: HttpHeaders | {
				[header: string]: string | string[]
			},
			params?: HttpParams | {
				[param: string]: string | string[];
			};
			useLocal?:boolean;
			microservice?: string;
			responseType?: string;
		}) {
		return this.http.post<T>(
			env.hostname + options.endPoint, body, {
			headers: options.headers ? options.headers : new HttpHeaders({
				'Content-Type': 'application/json'
			}),
			params: options.params ? options.params : undefined,
			observe: 'response'
		}).pipe(
			retry(0),
			catchError(this.handleError)
		);
	}

	sendCSV<T>(
		body: any,
		options: {
			endPoint: string,
			headers?: HttpHeaders | {
				[header: string]: string | string[]
			},
			params?: HttpParams | {
				[param: string]: string | string[];
			};
			useLocal?:boolean;
			microservice?: string;
			responseType?: string;
		}) {
		return this.http.post<T>(
			env.hostname + options.endPoint, body, {
			headers: options.headers ? options.headers : new HttpHeaders({
			}),
			params: options.params ? options.params : undefined,
			observe: 'response'
		}).pipe(
			retry(0),
			catchError(this.handleError)
		);
	}

	put<T>(
		body: any,
		options: {
			endPoint: string,
			headers?: HttpHeaders | {
				[header: string]: string | string[]
			},
			params?: HttpParams | {
				[param: string]: string | string[];
			};
			useLocal?:boolean;
			microservice?: string;
			responseType?: string;
		}) {
		return this.http.put<T>(
			env.hostname + options.endPoint, body, {
			headers: options.headers ? options.headers : new HttpHeaders({
				'Content-Type': 'application/json'
			}),
			params: options.params ? options.params : undefined,
			observe: 'response'
		}).pipe(
			retry(0),
			catchError(this.handleError)
		);
	}

	delete<T>(
		options: {
			endPoint: string,
			headers?: HttpHeaders | {
				[header: string]: string | string[]
			},
			params?: HttpParams | {
				[param: string]: string | string[];
			};
			useLocal?:boolean;
			microservice?: string;
			responseType?: string;
		}) {
		return this.http.delete<T>(
			env.hostname + options.endPoint, {
			headers: options.headers ? options.headers : new HttpHeaders({
				'Content-Type': 'application/json'
			}),
			params: options.params ? options.params : undefined,
			observe: 'response'
		}).pipe(
			retry(0),
			catchError(this.handleError)
		);
	}

	patch<T>(
		body: any,
		options: {
			endPoint: string,
			headers?: HttpHeaders | {
				[header: string]: string | string[]
			},
			params?: HttpParams | {
				[param: string]: string | string[];
			};
			useLocal?:boolean;
			microservice?: string;
			responseType?: string;
		}) {
		return this.http.patch<T>(
			env.hostname + options.endPoint, body, {
			headers: options.headers ? options.headers : new HttpHeaders({
				'Content-Type': 'application/json'
			}),
			params: options.params ? options.params : undefined,
			observe: 'response'
		}).pipe(
			retry(0),
			catchError(this.handleError)
		);
	}

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
			throw error;
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }

}
