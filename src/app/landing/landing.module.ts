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
import { AuthService } from './services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { LocalStorageService } from '../shared/services/storages/local-storage.service';
import { SessionUtilsService } from './services/session-utils.service';


@NgModule({
  declarations: [
    LandingPageComponent,
    SignUpComponent,
    SignInComponent
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
    MatDialogModule,
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
