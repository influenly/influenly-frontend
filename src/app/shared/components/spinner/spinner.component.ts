import { Component } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  color: string = '#7250F8';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter: number = 100;
  value: number = 50;
  align: string = 'center-middle';
}
