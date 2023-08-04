import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent {

  isMenuOpened: boolean = false;
  token: string|undefined = undefined;

  tokenSubs: Subscription|undefined = undefined;

  constructor(private sessionStorage: SessionStorageService,
              private router: Router) {
    this.tokenSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.token)?.subscribe(token => this.token = token);
  }

  logout() {
    //TODO: send logout to backend to expire token
    this.token = undefined;
    this.tokenSubs?.unsubscribe();
    this.sessionStorage.remove(SESSION_STORAGE_KEYS.token);
    this.router.navigate(['landing']);
  }

}