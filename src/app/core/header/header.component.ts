import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { SESSION_STORAGE_KEYS, SessionStorageService } from 'src/app/shared/services/storages/session-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isHandset: boolean = false;
  isLanding: boolean = false;
  userType: string | undefined;
  pathsToShowLoginBtn: string[] = ['/', '/how-it-works', '/about-us', '/terms-of-service', '/privacy-policy'];

  isHandsetSubs: Subscription | undefined;
  navigationEndSubs: Subscription | undefined;

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
    this.isLanding = this.pathsToShowLoginBtn.includes(this.router.url);
    this.navigationEndSubs = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(async (event: any) => {
        this.isLanding = this.pathsToShowLoginBtn.includes(event.url);
        this.userType = await this.sessionStorage.getFirst(SESSION_STORAGE_KEYS.user_type);
    });
  }
  

  ngOnDestroy() {
    if (this.isHandsetSubs) this.isHandsetSubs.unsubscribe();
    if (this.navigationEndSubs) this.navigationEndSubs.unsubscribe();
  }

  goToMain() {
    this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
