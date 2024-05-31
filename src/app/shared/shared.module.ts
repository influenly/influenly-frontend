import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestApiClient } from './services/rest-api/rest-api.client';
import { InformationModalComponent } from './components/UI/information-modal/information-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LocationUtilsService } from './services/utils/location-utils.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EncryptionService } from './services/encryption.service';
import { BannerComponent } from './components/banner/banner.component';
import { SelectorComponent } from './components/selector/selector.component';



@NgModule({
  declarations: [
    InformationModalComponent,
    SvgIconComponent,
    NotFoundComponent,
    SpinnerComponent,
    BannerComponent,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [
    RestApiClient,
    LocationUtilsService,
    EncryptionService
  ],
  exports: [
    InformationModalComponent,
    SvgIconComponent,
    SpinnerComponent,
    BannerComponent,
    SelectorComponent
  ]
})
export class SharedModule { }
