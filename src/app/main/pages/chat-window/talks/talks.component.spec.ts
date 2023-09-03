import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalksComponent } from './talks.component';

describe('TalksComponent', () => {
  let component: TalksComponent;
  let fixture: ComponentFixture<TalksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalksComponent]
    });
    fixture = TestBed.createComponent(TalksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
