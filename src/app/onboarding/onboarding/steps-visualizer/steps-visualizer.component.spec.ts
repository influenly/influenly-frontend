import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsVisualizerComponent } from './steps-visualizer.component';

describe('StepsVisualizerComponent', () => {
  let component: StepsVisualizerComponent;
  let fixture: ComponentFixture<StepsVisualizerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepsVisualizerComponent]
    });
    fixture = TestBed.createComponent(StepsVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
