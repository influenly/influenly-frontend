import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SocketService, TOPIC } from "src/app/shared/services/socket/socket.service";
import { SESSION_STORAGE_KEYS, SessionStorageService } from "src/app/shared/services/storages/session-storage.service";

@Injectable()
export class SessionUtilsService {
    
    constructor(private sessionStorage: SessionStorageService,
                private socketService: SocketService,
                private router: Router) {}

    public async onLogin(response: any) {
        this.sessionStorage.set(SESSION_STORAGE_KEYS.token, response.token);
        this.sessionStorage.set(SESSION_STORAGE_KEYS.user_type, response.user.type);
        this.sessionStorage.set(SESSION_STORAGE_KEYS.user_id, response.user.id);
        await this.socketService.connectSocket();
        this.socketService.subscribeTopic(TOPIC.RECEIVE + response.user.id);
        if (!response.user.onboardingCompleted) {
            this.router.navigate(['app/onboarding']);
        } else {
            this.router.navigate(['app/profile']);
        }
    }
}