import { AdsViewModule } from './ads-view/ads-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { AdDetailsComponent } from "./ad-details/ad-details.component";
import { PipesModule } from "../../pipes/pipes.module";
import { SharedModule } from "../../app/shared/shared.module";
import { EmailModalComponent } from "./ad-details/email-modal/email-modal.component";
// import { FavouriteComponent, ListViewComponent } from "./components/index";

@NgModule({
  imports: [PipesModule, SharedModule, FormsModule, ReactiveFormsModule, AdsViewModule],
  declarations: [AdDetailsComponent,  EmailModalComponent],
  entryComponents: [AdDetailsComponent,  EmailModalComponent]
})
export class AdsModule {}
