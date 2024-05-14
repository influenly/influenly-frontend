import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePolicyComponent } from './private-policy.component';

describe('PrivatePolicyComponent', () => {
  let component: PrivatePolicyComponent;
  let fixture: ComponentFixture<PrivatePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivatePolicyComponent]
    });
    fixture = TestBed.createComponent(PrivatePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
