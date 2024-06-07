import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestApiClient } from "src/app/shared/services/rest-api/rest-api.client";

@Injectable()
export class EmailValidationService {

    constructor(private restApiClient: RestApiClient) {}

    public validateCoode$(payload: any): Observable<HttpResponse<any>> {
        return this.restApiClient.post<any>(payload, {
            endPoint: '/user/email/validation'
        });
    }

    public resendCoode$(): Observable<HttpResponse<any>> {
        return this.restApiClient.post<any>(undefined, {
            endPoint: '/user/email/validation/resend'
        });
    }
}