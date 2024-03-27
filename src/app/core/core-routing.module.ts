import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthGuard } from './guard/auth.guard';
import { LandingGuard } from './guard/landing.guard';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                canActivate: mapToCanActivate([LandingGuard]),
                loadChildren: () => import('../landing/landing.module').then(m => m.LandingModule)
            },
            {
                path: 'app',
                canActivate: mapToCanActivate([AuthGuard]),
                loadChildren: () => import('../main/main.module').then(m => m.MainModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
