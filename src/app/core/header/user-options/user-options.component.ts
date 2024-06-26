import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketService } from 'src/app/shared/services/socket/socket.service';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';
import { AuthService } from '../../services/auth.service';
import { SessionUtilsService } from '../../services/session-utils.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.scss']
})
export class UserOptionsComponent implements OnInit, OnDestroy {

  isMenuOpened: boolean = false;
  showComponent: string | undefined;

  isShowSubs: Subscription|undefined;

  constructor(private sessionStorage: SessionStorageService,
              private sessionUtils: SessionUtilsService,
              private router: Router,
              private socketService: SocketService,
              private authService: AuthService) {
  }

  ngOnInit() {
    console.info('user-option init')
    this.isShowComponent();
  }

  private isShowComponent() {
    this.isShowSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.show_header_actions)?.subscribe(value => this.showComponent = value);
  }

  goToProfile() {
    this.router.navigate(['app/profile']);
  }

  logout() {
    this.authService.logout$().subscribe({
      next: async (v) => {
        this.socketService.disconnectSocket();
        this.sessionUtils.clearSessionStorage();
        this.router.navigate(['']);
        },
        error: (e) => {
          this.router.navigate(['']);
        }
    });
  }

  ngOnDestroy() {
    console.info('user-option destroy')
    if (this.isShowSubs) this.isShowSubs.unsubscribe();
  }
}
