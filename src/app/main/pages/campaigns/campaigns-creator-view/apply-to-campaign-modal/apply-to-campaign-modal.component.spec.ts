import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyToCampaignModalComponent } from './apply-to-campaign-modal.component';

describe('ApplyToCampaignModalComponent', () => {
  let component: ApplyToCampaignModalComponent;
  let fixture: ComponentFixture<ApplyToCampaignModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyToCampaignModalComponent]
    });
    fixture = TestBed.createComponent(ApplyToCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
