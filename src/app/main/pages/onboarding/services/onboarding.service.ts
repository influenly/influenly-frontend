import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestApiClient } from "src/app/shared/services/rest-api/rest-api.client";
import { IntegrationModel } from "../models/integration.model";
import { OnboardingModel } from "../models/onboarding.model";
import { UserDataModel } from "../../profile/models/user-data.model";

@Injectable()
export class OnboardingService {

    constructor(private restApiClient: RestApiClient) {}

    public integration$(payload: IntegrationModel): Observable<HttpResponse<any>>{
        return this.restApiClient.post<any>(payload, {
            endPoint: '/integration'
        });
    }

    public completeOnboarding$(payload: OnboardingModel): Observable<HttpResponse<UserDataModel>>{
        return this.restApiClient.post<UserDataModel>(payload, {
            endPoint: '/user/onboarding'
        });
    }

}