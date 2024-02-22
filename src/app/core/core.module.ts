import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserOptionsComponent } from './header/user-options/user-options.component';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ChatComponent } from './header/chat/chat.component';
import { DiscoveryButtonComponent } from './header/discovery-button/discovery-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    UserOptionsComponent,
    ChatComponent,
    DiscoveryButtonComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule
  ]
})
export class CoreModule { }
