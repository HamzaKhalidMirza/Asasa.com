import { Component, OnInit } from "@angular/core";
import { Platform, LoadingController, ModalController } from "@ionic/angular";
import { Service } from "../../app/services/service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  cities = [];
  locations = [];
  loading: any;
  data: any;
  purpose: any = "buy";

  ngForm: FormGroup;

  images = [];
  files = [];

  constructor(
    private modalCtrl: ModalController,
    private service: Service,
    platform: Platform,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController
  ) {
    platform.backButton.subscribe(() => {
      this.closeModal();
    });
  }

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.ngForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      propertyDetails: ['', [Validators.required]],
      propertyType: ['', [Validators.required]],
      landArea: ['', [Validators.required]],
      landAreaUnit: ['', [Validators.required]],
      demand: ['', [Validators.required]],
      message: ['']
    });
  }

  get Purpose() {
    return this.ngForm.get("purpose");
  }
  get Name() {
    return this.ngForm.get("name");
  }
  get Email() {
    return this.ngForm.get("email");
  }
  get Phone() {
    return this.ngForm.get("phone");
  }
  get City() {
    return this.ngForm.get("city");
  }
  get PropertyDetails() {
    return this.ngForm.get("propertyDetails");
  }
  get PropertyType() {
    return this.ngForm.get("propertyType");
  }
  get LandArea() {
    return this.ngForm.get("landArea");
  }
  get LandAreaUnit() {
    return this.ngForm.get("landAreaUnit");
  }
  get Demand() {
    return this.ngForm.get("demand");
  }
  get Message() {
    return this.ngForm.get("message");
  }

  ionViewDidEnter() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectSale() {
    this.purpose = 'buy';
  }
  selectRent() {
    this.purpose = 'rent';
  }

  async postProperty() {
    const data = {
      email: this.Email.value,
      name: this.Name.value,
      phone: this.Phone.value,
      area: this.LandArea.value,
      demand: this.Demand.value,
      property_type: this.PropertyType.value,
      city: this.City.value,
      location: this.PropertyDetails.value,
      landarea_unit: this.LandAreaUnit.value,
      message: this.Message.value,
      purpose: this.purpose,
      images: this.files
    };

    var loading = await this.loadingCtrl.create({
      message: "Please wait...",
    });

    loading.present();

    this.service.saveCustomerProperty(data).subscribe(
      (res) => {
        loading.dismiss();
        this.modalCtrl.dismiss();
        var msg = "Request Sent Successfully!";
        this.service.toast(msg);
      },
      (err) => {
        console.error("error", err);
        var msg = "Some Error Occured While Posting Your Request.";
        this.service.toast(msg);
      }
    );
  }
  
  removeImage(index) {
    this.images.splice(index, 1);
  }

  onImageSelect(files: FileList) {
    if (files.length > 9 || this.images.length > 9) {
      this.service.toast("Maximum 10 images please.")
    }
    else {
      for (let i = 0; i < files.length; i++) {

        const file = <File>files.item(i);
        const reader = new FileReader();

        reader.onload = (event: any) => {
          this.images.push(reader.result);
          this.files.push(file);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
}
