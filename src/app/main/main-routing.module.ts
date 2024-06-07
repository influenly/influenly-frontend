
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatWindowComponent } from './pages/chat-window/chat-window.component';
import { DiscoveryComponent } from './pages/discovery/discovery.component';
import { AuthGuard } from '../core/guard/auth.guard';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
    },
    {
        path: 'onboarding',
        component: OnboardingComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'user/:username',
        component: ProfileComponent
    },
    {
        path: 'chat',
        component: ChatWindowComponent
    },
    {
        path: 'discovery',
        component: DiscoveryComponent,
        canActivate: [AuthGuard],
        data: { admitedUserType: 'ADVERTISER' }
    },
    {
        path: 'campaigns',
        component: CampaignsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
      