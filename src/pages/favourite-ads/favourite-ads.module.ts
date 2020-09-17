import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouriteAdsPageRoutingModule } from './favourite-ads-routing.module';

import { FavouriteAdsPage } from './favourite-ads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouriteAdsPageRoutingModule
  ],
  declarations: [FavouriteAdsPage]
})
export class FavouriteAdsPageModule {}
