import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  isHandset: boolean = false;

  isHandsetSubs: Subscription | undefined;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandsetSubs = this.breakpointObserver.observe(['(max-width: 768px)'])
    .pipe(map(result => result.matches)).subscribe(match => {
        this.isHandset = match;
    });
  }

  ngOnDestroy() {
    console.info('header destroy');
    if (this.isHandsetSubs) this.isHandsetSubs.unsubscribe();
  }

}
