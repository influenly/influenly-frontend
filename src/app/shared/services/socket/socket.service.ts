import { SESSION_STORAGE_KEYS, SessionStorageService } from './../storages/session-storage.service';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { io } from 'socket.io-client';
import { environment as env } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { MessageModel } from 'src/app/main/pages/profile/models/message.model';

export enum TOPIC {
    SEND = 'sendMessage',
    RECEIVE = 'recMessage-'
};
@Injectable({providedIn: 'root'})
export class SocketService {

    @Output() outEvent: EventEmitter<MessageModel> = new EventEmitter();
    
    private socket: any;
    private token: string|undefined;
    reconected: boolean = false

    constructor(private sessionStorage: SessionStorageService) {}

    public async connectSocket() {
        if (!this.token) {
            const tokenObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.token);
            if (tokenObs) {
                this.token = await firstValueFrom(tokenObs);
            }
        }
        this.socket = io(env.socketHostname, {extraHeaders: {"Authorization": this.token ? this.token : ''}});
        this.socket.on("connect_error", (err: any) => {
            console.log(`connect_error due to ${err.message}`);
            if (!this.reconected) {
                this.socket.client = this.token;
                this.socket = this.socket.disconnect().connect();
                this.reconected = true;
            }
        });
        console.info('socket connected');
    }

    public disconnectSocket() {
        if (this.socket) {
            this.socket.disconnect();
            console.info('socket disconnected')
        }
    }

    public subscribeTopic(topic: string) {
        this.socket.on(topic, (message: any) => this.outEvent.emit(message));
    }

    public async emitMessage(topic: string, message: any) {
        this.socket.emit(topic, message);
    }
    
}