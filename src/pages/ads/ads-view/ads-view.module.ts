import { SharedModule } from './../../../app/shared/shared.module';
import { AdsViewComponent } from './ads-view.component';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: "",
        component: AdsViewComponent
      }
    ]),
  ],
  declarations: [AdsViewComponent],
  entryComponents: [AdsViewComponent],
})
export class AdsViewModule {}
