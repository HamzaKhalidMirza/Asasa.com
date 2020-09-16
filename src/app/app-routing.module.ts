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
    loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'testimonial',
    loadChildren: () => import('../pages/testimonial/testimonial.module').then( m => m.TestimonialPageModule)
  },
  {
    path: 'sell',
    loadChildren: () => import('../pages/sell/sell.module').then( m => m.SellPageModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('../pages/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'locate-us',
    loadChildren: () => import('../pages/locate-us/locate-us.module').then( m => m.LocateUsPageModule)
  },
  {
    path: 'favourite-ads',
    loadChildren: () => import('../pages/favourite-ads/favourite-ads.module').then( m => m.FavouriteAdsPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('../pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'architect',
    loadChildren: () => import('../pages/architect/architect.module').then( m => m.ArchitectPageModule)
  },
  {
    path: 'ad-details',
    loadChildren: () => import('../pages/ads/ad-details/ad-details.module').then( m => m.AdDetailsPageModule)
  },
  {
    path: 'ads-view',
    loadChildren: () => import('../pages/ads/ads-view/ads-view.module').then( m => m.AdsViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
