import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-discovery-button',
  templateUrl: './discovery-button.component.html',
  styleUrls: ['./discovery-button.component.scss', '../header.component.scss']
})
export class DiscoveryButtonComponent implements OnInit, OnDestroy { 

  @Input() isHandset: boolean = false;
  userId: string|undefined;

  userIdSubs: Subscription|undefined;

  constructor(private sessionStorage: SessionStorageService,
              private router: Router) {
  }

  ngOnInit() {
    console.info('discovery-option init');
    this.getToken();
  }

  private async getToken() {
    this.userIdSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.user_id)?.subscribe(userId => this.userId = userId);
  }

  goToDiscovery() {
    this.router.navigate(['app/discovery']);
  }

  ngOnDestroy() {
    if (this.userIdSubs) this.userIdSubs.unsubscribe();
  }

}
