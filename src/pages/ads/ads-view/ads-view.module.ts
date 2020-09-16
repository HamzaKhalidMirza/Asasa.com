import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsViewPageRoutingModule } from './ads-view-routing.module';

import { AdsViewPage } from './ads-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsViewPageRoutingModule
  ],
  declarations: [AdsViewPage]
})
export class AdsViewPageModule {}
