import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-discovery-button',
  templateUrl: './discovery-button.component.html',
  styleUrls: ['./discovery-button.component.scss', '../header.component.scss']
})
export class DiscoveryButtonComponent implements OnInit { 

  token: string|undefined;
  @Input() isHandset: boolean = false;

  tokenSubs: Subscription|undefined;
  isHandsetSubs: Subscription|undefined;

  constructor(private sessionStorage: SessionStorageService,
              private router: Router) {
  }

  ngOnInit() {
    console.info('discovery-option init');
    this.getToken();
  }

  private async getToken() {
    this.tokenSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.token)?.subscribe(token => this.token = token);
  }

  goToDiscovery() {
    this.router.navigate(['app/discovery']);
  }

}
