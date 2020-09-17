import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavController,
  NavParams,
  Platform,
} from "@ionic/angular";
import { Service } from "../../app/services/service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements OnInit {
  user: any;
  message: any;
  purpose: any;

  ngForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private service: Service,
    platform: Platform,
    private formBuilder: FormBuilder
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
      purpose: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }
  get Purpose() {
    return this.ngForm.get("purpose");
  }
  get Message() {
    return this.ngForm.get("message");
  }

  ionViewDidEnter() {
    console.log("ionViewDidLoad TestimonialPage");
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  postTestimoial() {
    var data;
    if (this.user.image) {
      data = {
        userId: this.user._id,
        name: this.user.name,
        image: this.user.image.fileLocation,
        reason: this.purpose,
        comment: this.message,
      };
    } else {
      data = {
        userId: this.user._id,
        name: this.user.name,
        image: null,
        reason: this.purpose,
        comment: this.message,
      };
    }

    this.service.addTestimonial(data).subscribe(
      (data) => {
        this.closeModal();
        this.service.toast(data.message);
      },
      (error) => {}
    );
  }
}
