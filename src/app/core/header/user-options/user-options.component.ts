import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent implements OnInit {

  isMenuOpened: boolean = false;
  token: string|undefined = undefined;


  constructor(private sessionStorage: SessionStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.getToken();
  }

  private async getToken() {
    const tokenSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.token);
    if (tokenSubs) {
      this.token = await firstValueFrom(tokenSubs);
    }
  }

  goToProfile() {
    this.router.navigate(['app/profile']);
  }

  logout() {
    //TODO: send logout to backend to expire token
    this.token = undefined;
    this.sessionStorage.clear();
    this.router.navigate(['landing']);
  }

}
