import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouriteAdsPage } from './favourite-ads.page';

const routes: Routes = [
  {
    path: '',
    component: FavouriteAdsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouriteAdsPageRoutingModule {}
