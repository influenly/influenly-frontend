import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'landing'
  },
  {
    path: 'landing',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
		redirectTo: '404',
		pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
