import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./../pages/home/home-components/home-component.module').then( m => m.HomeComponentModule)
  },
  {
    path: 'architect',
    loadChildren: () => import('../pages/architect/architect.module').then( m => m.ArchitectPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('../pages/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'favourite-ads',
    loadChildren: () => import('../pages/favourite-ads/favourite-ads.module').then( m => m.FavouriteAdsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
