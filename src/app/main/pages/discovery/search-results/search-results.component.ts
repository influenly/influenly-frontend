import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DiscoveryService } from '../services/discovery.service';
import { Filter } from '../discovery-filters/discovery-filters.component';
import { showFilter } from '../discovery.component';
import { Subscription, map } from 'rxjs';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/shared/services/encryption.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  users: any[] = [];
  filters: Filter | undefined = undefined;
  orderByOption: string = 'more_relevant';
  isHandset: boolean = false;

  isHandsetSubs: Subscription;

  constructor(private discoveryService: DiscoveryService,
            private breakpointObserver: BreakpointObserver,
            private router: Router,
            private encryptionService: EncryptionService) {
    this.isHandsetSubs = this.breakpointObserver.observe(['(max-width: 768px)'])
    .pipe(map(result => result.matches)).subscribe(match => {
        this.isHandset = match;
    });
  }

  ngOnInit() {
    this.onChangeFilters();
  }

  private onChangeFilters() {
    this.discoveryService.getFilters().subscribe((filters) => {
        this.discoveryService.getCreators$(filters.tags, filters.minFollowers ? filters.minFollowers : 0, filters.maxFollowers ? filters.maxFollowers : 0).subscribe({
            next: (v) => {
                this.users = v.body.data;
            },
            error: (e) => {
                //TODO: mostrar error al cargar usuarios
            }
        });
    });
  }

  showFilter() {
    showFilter.set(true);
  }

  async openUserProfile(userId: number) {
    const encryptedUserId = await this.encryptionService.encrypt(userId.toString());
    this.router.navigate(
      ['/app/user'],
      { queryParams: { trackingId: encryptedUserId }
    });
  }

  ngOnDestroy() {
    if (this.isHandsetSubs) this.isHandsetSubs.unsubscribe();
  }

}
