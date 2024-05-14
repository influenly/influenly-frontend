import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserOptionsComponent } from './header/user-options/user-options.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'
import { TranslateModule } from '@ngx-translate/core';
import { ChatComponent } from './header/chat/chat.component';
import { DiscoveryButtonComponent } from './header/discovery-button/discovery-button.component';
import { AuthService } from './services/auth.service';
import { SessionUtilsService } from './services/session-utils.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MainLayoutComponent,
    UserOptionsComponent,
    ChatComponent,
    DiscoveryButtonComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
    MatDividerModule
  ],
  providers: [
    AuthService,
    SessionUtilsService
  ]
})
export class CoreModule { }
