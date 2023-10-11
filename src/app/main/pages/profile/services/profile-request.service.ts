import { Injectable } from "@angular/core";
import { RestApiClient } from "src/app/shared/services/rest-api/rest-api.client";
import { NetworkProfileModel, UserDataModel } from "../models/user-data.model";
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ProfileRequestService {

    constructor(private restApiClient: RestApiClient) {}

    public getProfileData$(userId: string): Observable<HttpResponse<{user: UserDataModel, networks: NetworkProfileModel[]}>> {
        return this.restApiClient.get<{user: UserDataModel, networks: NetworkProfileModel[]}>({
            endPoint: '/user/' + userId + '/profile'
        });
    };

    public updateProfileData$(payload: any): Observable<HttpResponse<UserDataModel>> {
        return this.restApiClient.patch<UserDataModel>(payload, {
            endPoint: '/user/profile'
        });
    }

}