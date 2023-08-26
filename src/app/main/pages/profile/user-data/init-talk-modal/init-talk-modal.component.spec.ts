import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitTalkModalComponent } from './init-talk-modal.component';

describe('InitTalkModalComponent', () => {
  let component: InitTalkModalComponent;
  let fixture: ComponentFixture<InitTalkModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitTalkModalComponent]
    });
    fixture = TestBed.createComponent(InitTalkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
