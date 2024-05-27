import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationPageComponent } from './email-verification-page.component';

describe('EmailVerificationPageComponent', () => {
  let component: EmailVerificationPageComponent;
  let fixture: ComponentFixture<EmailVerificationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVerificationPageComponent]
    });
    fixture = TestBed.createComponent(EmailVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
