import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    skipUrls = ['/login','/signup'];
    setPanelData: boolean = true;

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let withCredentials = true;
        for (let path of this.skipUrls) {
            if (request.url.includes(path)) {
                withCredentials = false;
                break;
            }
        }
        request = request.clone({
            withCredentials: withCredentials
        });
        return next.handle(request);
    }
}

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true 
    }
];