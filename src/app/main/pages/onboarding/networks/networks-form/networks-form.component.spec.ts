import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworksFormComponent } from './networks-form.component';

describe('NetworksFormComponent', () => {
  let component: NetworksFormComponent;
  let fixture: ComponentFixture<NetworksFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworksFormComponent]
    });
    fixture = TestBed.createComponent(NetworksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
