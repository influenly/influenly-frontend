import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isHandset: boolean = false;
  userType: string | undefined;

  isHandsetSubs: Subscription | undefined;

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {
    this.isHandsetSubs = this.breakpointObserver.observe(['(max-width: 768px)'])
    .pipe(map(result => result.matches)).subscribe(match => {
        this.isHandset = match;
    });
  }

  ngOnInit() {
    this.loadSessionStorageValues();
  }

  async loadSessionStorageValues() {
    this.userType = await this.sessionStorage.getFirst(SESSION_STORAGE_KEYS.user_type);
  }
  

  ngOnDestroy() {
    console.info('header destroy');
    if (this.isHandsetSubs) this.isHandsetSubs.unsubscribe();
  }

  goToMain() {
    this.router.navigate(['/'])
  }

}
