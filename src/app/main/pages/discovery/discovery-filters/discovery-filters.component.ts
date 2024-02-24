import { Component } from '@angular/core';
import { AppConstants } from 'src/app/core/constants/app.constants';
import { DiscoveryService } from '../services/discovery.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-discovery-filters',
  templateUrl: './discovery-filters.component.html',
  styleUrls: ['./discovery-filters.component.scss']
})
export class DiscoveryFiltersComponent {

  contentTags: string[] = AppConstants.contentTags;
  filters: Filter = {
    tags: [],
    minFollowers: undefined,
    maxFollowers: undefined
  }
  tagFilterInput: string = '';
  minFollowersInput: number | undefined = undefined;
  maxFollowersInput: number | undefined = undefined;
  filteredTags: string [] = this.contentTags;

  constructor(private discoveryService: DiscoveryService,
              private translate: TranslateService) {}

  manageTagFilter(tag: string) {
    const index = this.filters.tags.indexOf(tag);
    if (index >= 0) {
      this.filters.tags.splice(index, 1);
    } else {
      this.filters.tags.push(tag);
    }
  }

  applyFilters() {
    this.filters.minFollowers = this.minFollowersInput;
    this.filters.maxFollowers = this.maxFollowersInput;
    this.minFollowersInput  = undefined;
    this.maxFollowersInput = undefined;
    this.discoveryService.setFilters(this.filters);
  }

  filterTags() {
    this.filteredTags = this.contentTags.filter(tag => 
      this.translate.instant('onboarding.content.tag_list.' + tag).normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
      .includes(this.tagFilterInput.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase())
    );
  }

  removeFollowersFilter() {
    this.filters.minFollowers = undefined;
    this.filters.maxFollowers = undefined;
  }

  resetTagFilter() {
    this.filters.tags = [];
    this.filters.minFollowers = undefined;
    this.filters.maxFollowers = undefined;
    this.tagFilterInput = '';
    this.filteredTags = this.contentTags;
  }

}

export interface Filter {
  tags: string[];
  minFollowers: number|undefined;
  maxFollowers: number|undefined;
}