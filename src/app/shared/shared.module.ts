import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestApiClient } from './services/rest-api/rest-api.client';
import { InformationModalComponent } from './components/UI/information-modal/information-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { SessionStorageService } from './services/storages/session-storage.service';



@NgModule({
  declarations: [
    InformationModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    RestApiClient,
    SessionStorageService
  ],
  exports: [InformationModalComponent]
})
export class SharedModule { }
