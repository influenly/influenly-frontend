import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SESSION_STORAGE_KEYS } from '../storages/session-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    skipUrls = [];
    setPanelData: boolean = true;

    constructor() { }

    getHeaders(request: HttpRequest<any>): HttpHeaders {
        let token = sessionStorage.getItem(SESSION_STORAGE_KEYS.token);

        for (let path of this.skipUrls) {
            if (request.url.includes(path)) {
                this.setPanelData = false;
                break;
            }
        }

        let headers: HttpHeaders = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', 'Bearer ' + token);
        }
        return headers;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            headers: this.getHeaders(request)
        });
        return next.handle(request);
    }
}