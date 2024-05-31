import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignModalComponent } from './new-campaign-modal.component';

describe('NewCampaignModalComponent', () => {
  let component: NewCampaignModalComponent;
  let fixture: ComponentFixture<NewCampaignModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCampaignModalComponent]
    });
    fixture = TestBed.createComponent(NewCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
