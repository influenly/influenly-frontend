import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsButtonComponent } from './campaigns-button.component';

describe('CampaignsButtonComponent', () => {
  let component: CampaignsButtonComponent;
  let fixture: ComponentFixture<CampaignsButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignsButtonComponent]
    });
    fixture = TestBed.createComponent(CampaignsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
