import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkSelectorComponent } from './network-selector.component';

describe('NetworkSelectorComponent', () => {
  let component: NetworkSelectorComponent;
  let fixture: ComponentFixture<NetworkSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkSelectorComponent]
    });
    fixture = TestBed.createComponent(NetworkSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
