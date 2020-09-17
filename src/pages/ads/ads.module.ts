import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { AdDetailsComponent } from "./ad-details/ad-details.component";
import { AdsViewComponent } from "./ads-view/ads-view.component";
import { PipesModule } from "../../pipes/pipes.module";
import { SharedModule } from "../../app/shared/shared.module";
import { EmailModalComponent } from "./ad-details/email-modal/email-modal.component";
// import { FavouriteComponent, ListViewComponent } from "./components/index";

@NgModule({
  imports: [PipesModule, SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [AdDetailsComponent, AdsViewComponent, EmailModalComponent],
  entryComponents: [AdDetailsComponent, AdsViewComponent, EmailModalComponent]
})
export class AdsModule {}
