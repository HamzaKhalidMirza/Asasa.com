import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocateUsPageRoutingModule } from './locate-us-routing.module';

import { LocateUsPage } from './locate-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocateUsPageRoutingModule
  ],
  declarations: [LocateUsPage]
})
export class LocateUsPageModule {}
