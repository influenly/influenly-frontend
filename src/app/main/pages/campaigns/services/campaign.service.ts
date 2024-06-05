import { Injectable } from "@angular/core";
import { RestApiClient } from "src/app/shared/services/rest-api/rest-api.client";
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { CampaignModel } from "../models/campaign.model";

@Injectable()
export class CampaignService {

    constructor(private restApiClient: RestApiClient) {}

    public createCampaign$(payload: CampaignModel): Observable<HttpResponse<any>> {
        return this.restApiClient.post<any>(payload, {
            endPoint: '/campaign'
        });
    }

    public getCampaigns$(): Observable<HttpResponse<{ ok: boolean, campaigns: CampaignModel[] }>> {
        return this.restApiClient.get<any>({
            endPoint: '/campaign'
        });
    }

    public applyToCampaign$(payload: any): Observable<HttpResponse<any>> {
        return this.restApiClient.post<any>(payload, {
            endPoint: '/campaign/creator'
        });
    }

    public getApplicants$(campaignId: any): Observable<HttpResponse<any>> {
        return this.restApiClient.get<any>({
            endPoint: '/campaign/' + campaignId
        });
    }

}