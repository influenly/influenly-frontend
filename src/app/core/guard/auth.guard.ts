import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { SESSION_STORAGE_KEYS, SessionStorageService } from "src/app/shared/services/storages/session-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private router: Router,
                private sessionStorage: SessionStorageService) { }

    async canActivate() {
        console.log('AuthGuard#canActivate called');
        let userId;
        const userIdObs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_id);
        if (userIdObs) {
            userId = await firstValueFrom(userIdObs);
        }
        if (!userId) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
    
}