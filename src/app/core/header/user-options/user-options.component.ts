import { Component } from '@angular/core';
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

  constructor(private sessionStorage: SessionStorageService) {
    this.tokenSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.token)?.subscribe(token => this.token = token);
  }

  logout() {
    this.token = undefined;
    this.tokenSubs?.unsubscribe();
    this.sessionStorage.remove(SESSION_STORAGE_KEYS.token);
  }

}
