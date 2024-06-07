import { Injectable } from "@angular/core";
import { RestApiClient } from "src/app/shared/services/rest-api/rest-api.client";
import { UserDataModel } from "../models/user-data.model";
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ProfileRequestService {

    constructor(private restApiClient: RestApiClient) {}

    public getProfileData$(userId: string): Observable<HttpResponse<UserDataModel>> {
        return this.restApiClient.get<UserDataModel>({
            endPoint: '/user/' + userId
        });
    }

    public getProfileDataByUsername$(username: string): Observable<HttpResponse<UserDataModel>> {
        return this.restApiClient.get<UserDataModel>({
            endPoint: '/user/' + username
        });
    }

    public updateProfileData$(payload: any): Observable<HttpResponse<UserDataModel>> {
        return this.restApiClient.patch<UserDataModel>(payload, {
            endPoint: '/user'
        });
    }

    public saveProfileImg$(img: any): Observable<HttpResponse<any>> {
        return this.restApiClient.sendFile<any>(img, {
            endPoint: '/user/profileimg'
        });
    }

}