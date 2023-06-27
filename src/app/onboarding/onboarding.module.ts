import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { StepsVisualizerComponent } from './onboarding/steps-visualizer/steps-visualizer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    OnboardingComponent,
    StepsVisualizerComponent
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    TranslateModule
  ]
})
export class OnboardingModule { }
