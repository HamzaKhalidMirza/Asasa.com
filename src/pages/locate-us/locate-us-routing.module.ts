import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocateUsPage } from './locate-us.page';

const routes: Routes = [
  {
    path: '',
    component: LocateUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocateUsPageRoutingModule {}
