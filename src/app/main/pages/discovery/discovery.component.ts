import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, signal } from '@angular/core';
import { Subscription, map } from 'rxjs';

export const showFilter = signal<boolean>(false);
@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnDestroy {

  isHandset: boolean = false;
  showFilter = showFilter;

  isHandsetSubs: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandsetSubs = this.breakpointObserver.observe(['(max-width: 768px)'])
    .pipe(map(result => result.matches)).subscribe(match => {
        this.isHandset = match;
    });
  }

  ngOnDestroy(): void {
    if (this.isHandsetSubs) this.isHandsetSubs.unsubscribe();
  }
}
