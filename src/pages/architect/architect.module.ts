import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchitectPageRoutingModule } from './architect-routing.module';

import { ArchitectPage } from './architect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchitectPageRoutingModule
  ],
  declarations: [ArchitectPage]
})
export class ArchitectPageModule {}
