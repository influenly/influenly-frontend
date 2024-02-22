import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryButtonComponent } from './discovery-button.component';

describe('DiscoveryButtonComponent', () => {
  let component: DiscoveryButtonComponent;
  let fixture: ComponentFixture<DiscoveryButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoveryButtonComponent]
    });
    fixture = TestBed.createComponent(DiscoveryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
