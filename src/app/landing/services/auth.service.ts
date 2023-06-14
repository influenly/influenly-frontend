import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestApiClient } from "src/app/core/services/rest-api/rest-api.client";

@Injectable()
export class AuthService {

    constructor(private restApiClient: RestApiClient) {}

    public signUp$(payload: any): Observable<HttpResponse<any>>{
        return this.restApiClient.post<any>(payload, {
            endPoint: '/auth/sign-up'
        });
    }

    public signIn$(payload: any): Observable<HttpResponse<any>>{
        return this.restApiClient.post<any>(payload, {
            endPoint: '/auth/sign-in'
        });
    }
}