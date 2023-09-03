import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ChatService {

    private chatClosedEvent: Subject<boolean> = new Subject<boolean>();

    getChatClosedEvent(): Observable<boolean> {
        return this.chatClosedEvent.asObservable();
    }

    sendChatClosedEvent() {
        this.chatClosedEvent.next(true);
    }
}