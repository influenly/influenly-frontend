import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestApiClient } from "src/app/shared/services/rest-api/rest-api.client";
import { ConversationModel } from "../models/conversation.model";
import { MessageModel } from "../models/message.model";

@Injectable()
export class ChatRequestService {

    constructor(private restApiClient: RestApiClient) {}

    public getConversations$(): Observable<HttpResponse<ConversationModel[]>> {
        return this.restApiClient.get<ConversationModel[]>({
            endPoint: '/chat/conversation'
        });
    }

    public newConversation$(payload: any): Observable<HttpResponse<any>> {
        return this.restApiClient.post<any>(payload, {
            endPoint: '/chat/conversation'
        });
    };

    public updateConversation$(payload: any): Observable<HttpResponse<any>> {
        return this.restApiClient.patch<any>(payload, {
            endPoint: '/chat/conversation'
        });
    };

    public getMessages$(conversationId: string): Observable<HttpResponse<MessageModel[]>> {
        return this.restApiClient.get<MessageModel[]>({
            endPoint: '/chat/conversation/' + conversationId + '/message'
        });
    };

}