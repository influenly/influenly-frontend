import { SignUpComponent } from './sign-up/sign-up.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HowItWorksComponent } from './info/how-it-works/how-it-works.component';
import { AboutUsComponent } from './info/about-us/about-us.component';
import { PrivatePolicyComponent } from './info/private-policy/private-policy.component';
import { TermsOfServiceComponent } from './info/terms-of-service/terms-of-service.component';
import { EmailVerificationPageComponent } from './email-verification-page/email-verification-page.component';

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
        path: 'email-verification',
        component: EmailVerificationPageComponent
    },
    {
        path: 'login',
        component: SignInComponent
    },
    {
        path: 'how-it-works',
        component: HowItWorksComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path: 'terms-of-service',
        component: TermsOfServiceComponent
    },
    {
        path: 'privacy-policy',
        component: PrivatePolicyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
      