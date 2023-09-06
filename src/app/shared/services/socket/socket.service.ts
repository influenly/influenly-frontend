import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment as env } from '../../../../environments/environment';

export enum TOPIC {
    SEND = 'sendMessage',
    RECEIVE = 'recMessage-'
};
@Injectable({providedIn: 'root'})
export class SocketService {

    private socket: any;

    public connectSocket() {
        this.socket = io(env.socketHostname);
        console.info('socket connected');
    }

    public disconnectSocket() {
        if (this.socket) {
            this.socket.disconnect();
            console.info('socket disconnected')
        }
    }

    public subscribeTopic(topic: string, callback: () => void) {
        this.socket.on(topic, callback);
    }

    public emitMessage(topic: string, message: any) {
        if (!this.socket) {
            this.connectSocket();
        }
        this.socket.emit(topic, message);
    }
    
}