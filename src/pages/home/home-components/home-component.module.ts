import { ListViewComponent } from './../../../app/shared/components/list-view/list-view.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeComponentPage } from './home-component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild([
        {
          path: '',
          component: HomeComponentPage,
          children: [
            {
              path: "map",
              children: [
                {
                  path: "",
                  loadChildren: () =>
                    import("./../home.module").then((m) => m.HomePageModule),
                },
              ],
            },
            {
              path: "ads",
              children: [
                {
                  path: "",
                  loadChildren: () =>
                    import("./../../ads/ads-view/ads-view.module").then((m) => m.AdsViewModule),
                },
              ],
            },
            {
              path: "",
              redirectTo: "/home/map",
              pathMatch: "full",
            },
          ]
        },
        {
          path: "",
          redirectTo: "/home/map",
          pathMatch: "full",
        }     
      ])
    ],
    declarations: [ HomeComponentPage ],
    entryComponents: [ HomeComponentPage ]
  })
  export class HomeComponentModule {}
  