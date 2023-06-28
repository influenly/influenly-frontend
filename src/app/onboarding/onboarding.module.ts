import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { StepsVisualizerComponent } from './onboarding/steps-visualizer/steps-visualizer.component';



@NgModule({
  declarations: [
    OnboardingComponent,
    StepsVisualizerComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    TranslateModule,
    MatIconModule
  ]
})
export class OnboardingModule { }
