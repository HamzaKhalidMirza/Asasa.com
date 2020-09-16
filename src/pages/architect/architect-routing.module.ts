import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchitectPage } from './architect.page';

const routes: Routes = [
  {
    path: '',
    component: ArchitectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchitectPageRoutingModule {}
