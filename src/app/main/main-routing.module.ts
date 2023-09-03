
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { MainLayoutComponent } from '../core/main-layout/main-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatWindowComponent } from './pages/chat-window/chat-window.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'onboarding',
                component: OnboardingComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'user/:id',
                component: ProfileComponent
            },
            {
                path: 'chat',
                component: ChatWindowComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
      