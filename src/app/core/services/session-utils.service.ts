import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SocketService, TOPIC } from "src/app/shared/services/socket/socket.service";
import { SESSION_STORAGE_KEYS, SessionStorageService } from "src/app/shared/services/storages/session-storage.service";

@Injectable({
    providedIn: 'root'
})
export class SessionUtilsService {
    
    constructor(private sessionStorage: SessionStorageService,
                private socketService: SocketService,
                private router: Router) { }

    public async onLogin(response: any) {
        this.sessionStorage.set(SESSION_STORAGE_KEYS.user_type, response.user.type);
        this.sessionStorage.set(SESSION_STORAGE_KEYS.user_id, response.user.id);
        this.sessionStorage.set(SESSION_STORAGE_KEYS.username, response.user.username);
        this.sessionStorage.set(SESSION_STORAGE_KEYS.email, response.user.email);
        await this.socketService.connectSocket();
        this.socketService.subscribeTopic(TOPIC.RECEIVE + response.user.id);
        if (!response.user.emailVerified) {
            this.router.navigate(['email-verification']);
        } else {
            if (!response.user.onboardingCompleted) {
                this.router.navigate(['app/onboarding']);
                this.sessionStorage.set(SESSION_STORAGE_KEYS.show_header_actions, 'ONBOARDING');
            } else {
                this.router.navigate(['app/profile']);
                this.sessionStorage.set(SESSION_STORAGE_KEYS.show_header_actions, 'FULL');
            }
        }
    }

    public clearSessionStorage() {
        this.sessionStorage.remove(SESSION_STORAGE_KEYS.user_type);
        this.sessionStorage.remove(SESSION_STORAGE_KEYS.user_id);
        this.sessionStorage.set(SESSION_STORAGE_KEYS.show_header_actions, '');
    }

}