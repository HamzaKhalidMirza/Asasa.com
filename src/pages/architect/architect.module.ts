import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchitectPageRoutingModule } from './architect-routing.module';

import { ArchitectPage } from './architect.page';
import { ArchitectDetailsComponent } from './architect-details/architect-details.component';
import { ProjectDetailsComponent } from './architect-details/project-details/project-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchitectPageRoutingModule,
    PipesModule
  ],
  declarations: [
    ArchitectPage,
    ArchitectDetailsComponent,
    ProjectDetailsComponent
  ],
  entryComponents: [
    ArchitectDetailsComponent,
    ProjectDetailsComponent
  ]
})
export class ArchitectPageModule {}
