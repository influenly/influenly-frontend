import { Component } from '@angular/core';

@Component({
  selector: 'app-steps-visualizer',
  templateUrl: './steps-visualizer.component.html',
  styleUrls: ['./steps-visualizer.component.scss']
})
export class StepsVisualizerComponent {

  firstStepCompleted: boolean = false;
  secondStepCompleted: boolean = false;

  setFirstStepCompleted(check: boolean) {
    this.firstStepCompleted = check;
  }

  setSecondStepCompleted(check: boolean) {
    this.secondStepCompleted = check;
  }

}
