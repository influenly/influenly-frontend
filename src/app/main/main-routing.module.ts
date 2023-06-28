
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { MainLayoutComponent } from '../core/main-layout/main-layout.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: OnboardingComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
      