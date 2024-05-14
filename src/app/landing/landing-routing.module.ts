import { SignUpComponent } from './sign-up/sign-up.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HowItWorksComponent } from './info/how-it-works/how-it-works.component';

const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'sign-up/creator',
        component: SignUpComponent
    },
    {
        path: 'sign-up/advertiser',
        component: SignUpComponent
    },
    {
        path: 'login',
        component: SignInComponent
    },
    {
        path: 'how-it-works',
        component: HowItWorksComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
      