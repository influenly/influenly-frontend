import { HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { RestApiClient } from "src/app/shared/services/rest-api/rest-api.client";
import { Filter } from "../discovery-filters/discovery-filters.component";

@Injectable()
export class DiscoveryService {

    constructor(private restApiClient: RestApiClient) {}

    public getCreators$(contentTags: string[], minFollowers: number, maxFollowers: number): Observable<HttpResponse<any>>{
        let params = new HttpParams();
        if (contentTags && contentTags.length > 0) {
            params = params.append('content_tags', contentTags.join(";"));
        }
        if (minFollowers || maxFollowers) {
            const followersRange = minFollowers.toString() + '-' + (maxFollowers ? maxFollowers : '*');
            params = params.append('followers_range', followersRange)
        }
        return this.restApiClient.get<any>({
            endPoint: '/user/creator',
            params: params
        });
    }

    //Cache variables
    private filters: BehaviorSubject<Filter> = new BehaviorSubject<Filter>({
        tags: [],
        minFollowers: undefined,
        maxFollowers: undefined
    });

    getFilters(): Observable<Filter> {
        return this.filters.asObservable();
    }

    public setFilters(filters: Filter) {
        this.filters.next(filters);
    }

}