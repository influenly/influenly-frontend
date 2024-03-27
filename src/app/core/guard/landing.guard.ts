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
        const userIdObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_id);
        if (userIdObs) {
            userId = await firstValueFrom(userIdObs);
        }
        if (userId) {
            this.router.navigate(['/app/profile']);
            return false;
        }
        return true;
    }
    
}