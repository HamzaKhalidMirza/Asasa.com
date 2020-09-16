import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsViewPage } from './ads-view.page';

const routes: Routes = [
  {
    path: '',
    component: AdsViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsViewPageRoutingModule {}
