import { Component } from '@angular/core';
import { AppConstants } from 'src/app/core/constants/app.constants';

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

  manageTagFilter(tag: string) {
    const index = this.filters.tags.indexOf(tag);
    if (index >= 0) {
      this.filters.tags.splice(index, 1);
    } else {
      this.filters.tags.push(tag);
    }
  }

  applyFilters() {
    console.log(this.filters);
  }

}

export interface Filter {
  tags: string[];
  minFollowers: number|undefined;
  maxFollowers: number|undefined;
}