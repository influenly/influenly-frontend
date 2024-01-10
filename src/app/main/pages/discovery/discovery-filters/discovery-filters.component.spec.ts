import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryFiltersComponent } from './discovery-filters.component';

describe('DiscoveryFiltersComponent', () => {
  let component: DiscoveryFiltersComponent;
  let fixture: ComponentFixture<DiscoveryFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoveryFiltersComponent]
    });
    fixture = TestBed.createComponent(DiscoveryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
