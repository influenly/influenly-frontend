import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsAdvertiserViewComponent } from './campaigns-advertiser-view.component';

describe('CampaignsAdvertiserViewComponent', () => {
  let component: CampaignsAdvertiserViewComponent;
  let fixture: ComponentFixture<CampaignsAdvertiserViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignsAdvertiserViewComponent]
    });
    fixture = TestBed.createComponent(CampaignsAdvertiserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
