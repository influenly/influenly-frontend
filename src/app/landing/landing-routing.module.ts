import { SignUpComponent } from './sign-up/sign-up.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainLayoutComponent } from '../core/main-layout/main-layout.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: LandingPageComponent
            },
            {
                path: 'sign-up/creator',

                component: SignUpComponent
            }
        ]
    }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LandingRoutingModule { }
      