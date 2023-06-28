import { Component } from '@angular/core';

@Component({
  selector: 'app-steps-visualizer',
  templateUrl: './steps-visualizer.component.html',
  styleUrls: ['./steps-visualizer.component.scss']
})
export class StepsVisualizerComponent {

  firstStepCompleted: boolean = false;
  secondStepCompleted: boolean = false;
  thirdStepCompleted: boolean = false;

}
