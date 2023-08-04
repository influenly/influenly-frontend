import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkBasicInfoComponent } from './network-basic-info.component';

describe('NetworkBasicInfoComponent', () => {
  let component: NetworkBasicInfoComponent;
  let fixture: ComponentFixture<NetworkBasicInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkBasicInfoComponent]
    });
    fixture = TestBed.createComponent(NetworkBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
