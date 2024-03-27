import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { SESSION_STORAGE_KEYS, SessionStorageService } from "src/app/shared/services/storages/session-storage.service";

@Injectable({
    providedIn: 'root'
})
export class LandingGuard {

    constructor(private router: Router,
                private sessionStorage: SessionStorageService) { }

    async canActivate() {
        console.log('LandingGuard#canActivate called');
        let userId;
        let show;
        const userIdObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_id);
        if (userIdObs) {
            userId = await firstValueFrom(userIdObs);
        }
        if (userId) {
            const showHeaderActionsObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.show_header_actions);
            if (showHeaderActionsObs) {
                show = await firstValueFrom(showHeaderActionsObs);
            }
            if (show == 'FULL') {
                this.router.navigate(['/app/profile']);
            } else if (show == 'ONBOARDING') {
                this.router.navigate(['/app/onboarding']);
            }
            return false;
        }
        return true;
    }
    
}