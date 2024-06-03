import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

import { MainRoutingModule } from './main-routing.module';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { StepsVisualizerComponent } from './pages/onboarding/steps-visualizer/steps-visualizer.component';
import { PersonalInformationComponent } from './pages/onboarding/personal-information/personal-information.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NetworksComponent } from './pages/onboarding/networks/networks.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ContentComponent } from './pages/onboarding/content/content.component';
import { YoutubeIntegrationComponent } from './pages/onboarding/youtube-integration/youtube-integration.component';
import { SharedModule } from '../shared/shared.module';
import { OnboardingService } from './pages/onboarding/services/onboarding.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserDataComponent } from './pages/profile/user-data/user-data.component';
import { NetworkBasicInfoComponent } from './pages/profile/network-basic-info/network-basic-info.component';
import { ScoreComponent } from './pages/profile/score/score.component';
import { MatMenuModule } from '@angular/material/menu';
import { NetworkSelectorComponent } from './pages/profile/network-selector/network-selector.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdvancedAnalyticsComponent } from './pages/profile/advanced-analytics/advanced-analytics.component';
import { EditProfileModalComponent } from './pages/profile/edit-profile-modal/edit-profile-modal.component';
import { NetworksFormComponent } from './pages/onboarding/networks/networks-form/networks-form.component';
import { ContentFormComponent } from './pages/onboarding/content/content-form/content-form.component';
import { ProfileService } from './pages/profile/services/profile.service';
import { InitTalkModalComponent } from './pages/profile/user-data/init-talk-modal/init-talk-modal.component';
import { ProfileRequestService } from './pages/profile/services/profile-request.service';
import { ChatWindowComponent } from './pages/chat-window/chat-window.component';
import { TalksComponent } from './pages/chat-window/talks/talks.component';
import { ChatRequestService } from './pages/profile/services/chat-request.service';
import { ChatMessagesComponent } from './pages/chat-window/chat-messages/chat-messages.component';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import { DiscoveryFiltersComponent } from './pages/discovery/discovery-filters/discovery-filters.component';
import { SearchResultsComponent } from './pages/discovery/search-results/search-results.component';
import { UserCardComponent } from './pages/discovery/search-results/user-card/user-card.component';
import { DiscoveryService } from './pages/discovery/services/discovery.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { NewCampaignModalComponent } from './pages/campaigns/new-campaign-modal/new-campaign-modal.component';
import { CampaignService } from './pages/campaigns/services/campaign.service';
import { CampaignsAdvertiserViewComponent } from './pages/campaigns/campaigns-advertiser-view/campaigns-advertiser-view.component';
import { CampaignsCreatorViewComponent } from './pages/campaigns/campaigns-creator-view/campaigns-creator-view.component';
import { CampaignCardComponent } from './pages/campaigns/campaigns-creator-view/campaign-card/campaign-card.component';

@NgModule({
  declarations: [
    OnboardingComponent,
    StepsVisualizerComponent,
    PersonalInformationComponent,
    NetworksComponent,
    ContentComponent,
    YoutubeIntegrationComponent,
    ProfileComponent,
    UserDataComponent,
    NetworkBasicInfoComponent,
    ScoreComponent,
    NetworkSelectorComponent,
    AdvancedAnalyticsComponent,
    EditProfileModalComponent,
    NetworksFormComponent,
    ContentFormComponent,
    InitTalkModalComponent,
    ChatWindowComponent,
    TalksComponent,
    ChatMessagesComponent,
    DiscoveryComponent,
    DiscoveryFiltersComponent,
    SearchResultsComponent,
    UserCardComponent,
    CampaignsComponent,
    NewCampaignModalComponent,
    CampaignsAdvertiserViewComponent,
    CampaignsCreatorViewComponent,
    CampaignCardComponent,
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
    MatChipsModule,
    SharedModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    MatDividerModule,
    MatDialogModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'} },
    OnboardingService,
    ProfileService,
    ProfileRequestService,
    ChatRequestService,
    DiscoveryService,
    CampaignService
  ]
})
export class MainModule { }
