import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/shared/services/socket/socket.service';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent implements OnInit, OnDestroy {

  isMenuOpened: boolean = false;
  token: string|undefined = undefined;

  tokenSubs: Subscription|undefined;

  constructor(private sessionStorage: SessionStorageService,
              private router: Router,
              private socketService: SocketService) {
  }

  ngOnInit() {
    console.info('user-option init')
    this.getToken();
  }

  private async getToken() {
    this.tokenSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.token)?.subscribe(token => this.token = token);
  }

  goToProfile() {
    this.router.navigate(['app/profile']);
  }

  logout() {
    //TODO: send logout to backend to expire token
    this.token = undefined;
    this.socketService.disconnectSocket();
    this.sessionStorage.clear();
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    console.info('user-option destroy')
    if (this.tokenSubs) this.tokenSubs.unsubscribe();
  }
}
