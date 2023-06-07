import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { RestApiClient } from './services/rest-api/rest-api.client';
import { HttpClientModule } from '@angular/common/http';
import { InformationModalComponent } from './components/UI/information-modal/information-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    InformationModalComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule
  ],
  providers: [
    RestApiClient
  ]
})
export class CoreModule { }
