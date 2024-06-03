import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsCreatorViewComponent } from './campaigns-creator-view.component';

describe('CampaignsCreatorViewComponent', () => {
  let component: CampaignsCreatorViewComponent;
  let fixture: ComponentFixture<CampaignsCreatorViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignsCreatorViewComponent]
    });
    fixture = TestBed.createComponent(CampaignsCreatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
