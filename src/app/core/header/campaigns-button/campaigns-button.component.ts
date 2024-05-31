import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-campaigns-button',
  templateUrl: './campaigns-button.component.html',
  styleUrls: ['./campaigns-button.component.scss', '../header.component.scss']
})
export class CampaignsButtonComponent implements OnInit, OnDestroy {

  @Input() isHandset: boolean = false;
  showComponent: string | undefined;

  isShowSubs: Subscription | undefined;

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router
  )  { }

  ngOnInit() {
    this.isShowComponent();
  }

  private isShowComponent() {
    this.isShowSubs = this.sessionStorage.get(SESSION_STORAGE_KEYS.show_header_actions)?.subscribe(value => this.showComponent = value);
  }

  openCampaigns() {
    this.router.navigate(['app/campaigns']);
  }

  ngOnDestroy() {
    if (this.isShowSubs) this.isShowSubs.unsubscribe();
  }
}
