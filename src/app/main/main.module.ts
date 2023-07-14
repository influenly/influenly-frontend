import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { MainRoutingModule } from './main-routing.module';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { StepsVisualizerComponent } from './pages/onboarding/steps-visualizer/steps-visualizer.component';
import { PersonalInformationComponent } from './pages/onboarding/personal-information/personal-information.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NetworksComponent } from './pages/onboarding/networks/networks.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ContentComponent } from './pages/onboarding/content/content.component';
import { YoutubeIntegrationComponent } from './pages/onboarding/youtube-integration/youtube-integration.component';

@NgModule({
  declarations: [
    OnboardingComponent,
    StepsVisualizerComponent,
    PersonalInformationComponent,
    NetworksComponent,
    ContentComponent,
    YoutubeIntegrationComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TranslateModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
})
export class MainModule { }
