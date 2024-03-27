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
  showComponent: string | undefined;

  isShowSubs: Subscription | undefined;

  constructor(private sessionStorage: SessionStorageService,
              private router: Router) {
  }

  ngOnInit() {
    console.info('discovery-option init');
    this.isShowComponent();
  }

  private isShowComponent() {
    this.isShowSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.show_header_actions)?.subscribe(value => this.showComponent = value);
  }

  goToDiscovery() {
    this.router.navigate(['app/discovery']);
  }

  ngOnDestroy() {
    if (this.isShowSubs) this.isShowSubs.unsubscribe();
  }

}
