import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { MainRoutingModule } from './main-routing.module';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { StepsVisualizerComponent } from './pages/onboarding/steps-visualizer/steps-visualizer.component';



@NgModule({
  declarations: [
    OnboardingComponent,
    StepsVisualizerComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TranslateModule,
    MatIconModule
  ]
})
export class MainModule { }
