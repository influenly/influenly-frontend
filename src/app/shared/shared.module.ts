import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestApiClient } from './services/rest-api/rest-api.client';
import { InformationModalComponent } from './components/UI/information-modal/information-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LocationUtilsService } from './services/utils/location-utils.service';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    InformationModalComponent,
    SvgIconComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    RestApiClient,
    LocationUtilsService
  ],
  exports: [
    InformationModalComponent,
    SvgIconComponent
  ]
})
export class SharedModule { }
