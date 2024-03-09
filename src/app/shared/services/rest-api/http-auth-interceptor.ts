import { Injectable, Provider } from '@angular/core';
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
        // let withCredentials = true;
        // for (let path of this.skipUrls) {
        //     if (request.url.includes(path)) {
        //         withCredentials = false;
        //         break;
        //     }
        // } este codigo hacia que no se guarden las cookies en el navegador
        request = request.clone({
            withCredentials: true
        });
        return next.handle(request);
    }
}

export const httpInterceptorProviders: Provider = 
{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true 
};