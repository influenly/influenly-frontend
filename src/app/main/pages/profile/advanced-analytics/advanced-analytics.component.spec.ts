import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedAnalyticsComponent } from './advanced-analytics.component';

describe('AdvancedAnalyticsComponent', () => {
  let component: AdvancedAnalyticsComponent;
  let fixture: ComponentFixture<AdvancedAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedAnalyticsComponent]
    });
    fixture = TestBed.createComponent(AdvancedAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
