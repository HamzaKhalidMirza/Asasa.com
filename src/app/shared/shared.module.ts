import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ListViewComponent, FavouriteComponent } from "./components/index";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ListViewComponent, FavouriteComponent],
  exports: [CommonModule, IonicModule, ListViewComponent, FavouriteComponent],
})
export class SharedModule {}
