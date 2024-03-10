import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/shared/services/socket/socket.service';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent implements OnInit, OnDestroy {

  isMenuOpened: boolean = false;
  userId: string|undefined = undefined;

  userIdSubs: Subscription|undefined;

  constructor(private sessionStorage: SessionStorageService,
              private router: Router,
              private socketService: SocketService,
              private authService: AuthService) {
  }

  ngOnInit() {
    console.info('user-option init')
    this.getToken();
  }

  private async getToken() {
    this.userIdSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_id)?.subscribe(userId => this.userId = userId);
  }

  goToProfile() {
    this.router.navigate(['app/profile']);
  }

  logout() {
    this.authService.logout$().subscribe({
      next: async (v) => {
        this.socketService.disconnectSocket();
        this.sessionStorage.clear();
        this.router.navigate(['']);
        },
        error: (e) => {
          this.router.navigate(['']);
        }
    });
}

  ngOnDestroy() {
    console.info('user-option destroy')
    if (this.userIdSubs) this.userIdSubs.unsubscribe();
  }
}
