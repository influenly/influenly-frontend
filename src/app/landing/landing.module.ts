import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingRoutingModule } from './landing-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { LocalStorageService } from '../shared/services/storages/local-storage.service';
import { SessionUtilsService } from '../core/services/session-utils.service';
import { HowItWorksComponent } from './info/how-it-works/how-it-works.component';
import { AboutUsComponent } from './info/about-us/about-us.component';
import { PrivatePolicyComponent } from './info/private-policy/private-policy.component';
import { TermsOfServiceComponent } from './info/terms-of-service/terms-of-service.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    SignUpComponent,
    SignInComponent,
    HowItWorksComponent,
    AboutUsComponent,
    PrivatePolicyComponent,
    TermsOfServiceComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    AuthService,
    LocalStorageService,
    SessionUtilsService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class LandingModule { }
