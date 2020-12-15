import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ToastController } from "@ionic/angular";
import { Subject } from "rxjs";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class Service {
  token: string;
  filterParams: any;
  areaTypeFilterParams: any;

  searchParams: any;
  cities: any;
  locations: any;
  currentCity: any;
  filterApplied: boolean = false;
  favourites: number;

  emitAds: Subject<any> = new Subject<any>();
  emitFilters: Subject<any> = new Subject<any>();
  emitMapView: Subject<any> = new Subject<any>();
  emitLoader = new BehaviorSubject("default message");

  connection: Subject<any> = new Subject<any>();

  public apiUrl: string = "https://www.asasa.com/api/";
  // public apiUrl: string = "http://localhost:3000/api/";

  constructor(public http: HttpClient, public toastCtrl: ToastController) {}

  public getCities(): Observable<any> {
    return this.http.get(this.apiUrl + "get_cities")
    .pipe(map((res) => res));
  }
  public getLocations(): Observable<any> {
    return this.http
      .get(this.apiUrl + "get_locations")
      .pipe(map((res) => res));
    }
  public getAds(): Observable<any> {
    return this.http.get(this.apiUrl + "property")
    .pipe(map((res) => res));
  }

  public getAdByRefId(id): Observable<any> {
    return this.http
      .get(this.apiUrl + "property/" + id + "")
      .pipe(map((res) => res));
    }
  public sendEmail(email): Observable<any> {
    return this.http.post(this.apiUrl + "send_email", email);
  }

  public localeString(x, sep?, grp?) {
    var sx = ("" + x).split("."),
      s = "",
      i,
      j;
    sep || (sep = ","); // default seperator
    grp || grp === 0 || (grp = 2); // default grouping
    i = sx[0].length;
    s = sep + sx[0].slice(i - 3, i) + s;
    i = i - 3;
    while (i > grp) {
      j = i - grp;
      s = sep + sx[0].slice(j, i) + s;
      i = j;
    }
    s = sx[0].slice(0, i) + s;
    sx[0] = s;
    return sx.join(".");
  }

  public convertArea(areaType, area) {
    if (areaType == "Kanal") {
      var kanalToSqft = 5000;
      return parseInt(area) * kanalToSqft;
    } else if (areaType == "Marla") {
      var marlaToSqft = 250;
      return parseInt(area) * marlaToSqft;
    } else if (areaType == "Sq. Feet") {
      return parseInt(area);
    } else if (areaType == "Sq. Yard") {
      return parseInt(area) * 9;
    }
  }

  public compareStrings(a, b, isNum) {
    if (isNum === "isNum") {
    } else {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }

    return a < b ? -1 : a > b ? 1 : 0;
  }

  public async toast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom",
      // dismissOnPageChange: true,
    });
    toast.present();
  }

  public async toastFromTop(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
      // dismissOnPageChange: true,
    });
    toast.present();
  }

  public async toastError(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: "toast-error",
      position: "bottom",
      // dismissOnPageChange: true,
    });
    toast.present();
  }

  priceFilter(value) {
    var val: any = Math.abs(value);
    if (val >= 1000000000) {
      val = Number((val / 1000000000).toFixed(2)) + " Arab";
    } else if (val >= 10000000) {
      val = Number((val / 10000000).toFixed(2)) + " Crore";
    } else if (val >= 100000) {
      val = Number((val / 100000).toFixed(2)) + " Lac";
    } else if (val >= 1000) val = Number((val / 1000).toFixed(2)) + " Thousand";
    return val;
  }
  public saveCustomerProperty(customerAd): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("email", customerAd.email);
    formData.append("name", customerAd.name);
    formData.append("phone", customerAd.phone);
    formData.append("area", customerAd.area);
    formData.append("demand", customerAd.demand);
    formData.append("property_type", customerAd.property_type);
    formData.append("city", customerAd.city);
    formData.append("location", customerAd.location);
    formData.append("landarea_unit", customerAd.landarea_unit);
    formData.append("message", customerAd.message);
    formData.append("purpose", customerAd.purpose);

    if (customerAd.images) {
      for (let i in customerAd.images) {
        formData.append("images", customerAd.images[i], customerAd.images[i].name);
      }
    }

    return this.http.post(this.apiUrl + "save_customerProperty", formData);
  }

  public getCityLocations(location): Observable<any> {
    return this.http.post(this.apiUrl + "get_city_locations/", location);
  }

  favUrl = "https://www.asasa.com/api/favs/property/";
  public addFavourite(user_id, prop_id): Observable<any> {
    return this.http.post(this.favUrl + user_id + "/" + prop_id, {});
  }
  public removeFavourite(user_id, prop_id): Observable<any> {
    return this.http.delete(this.favUrl + user_id + "/" + prop_id, {});
  }

  public getArchitects(): Observable<any> {
    return this.http.get(this.apiUrl + "architect/getAllArchitects");
  }

  public addTestimonial(data): Observable<any> {
    return this.http.post(this.apiUrl + "feedback", data);
  }

  public addPropertyCount(id): Observable<any> {
    return this.http.post(this.apiUrl + `addPropertyCount/${id}`, {});
  }
  public addFavouriteCount(id): Observable<any> {
    return this.http.post(this.apiUrl + `addFavouriteCount/${id}`, {});
  }
  public getArchitectProjects(id): Observable<any> {
    var data = {
      id: id,
    };
    return this.http.post(this.apiUrl + "architect/getArchitectProjects", data);
  }

  public getCityProjects(id): Observable<any> {
    return this.http.get(this.apiUrl + "cityProjects/getCityProjects/" + id);
  }

  public sendVerificationCode(phone): Observable<any> {
    var data = {
      phone: phone,
    };

    return this.http.post(this.apiUrl + "phoneauth", data);
  }

  public verifyCode(body): Observable<any> {
    var data = {
      verificationCode: body.code,
      userId: body.userId,
    };
    return this.http.post(this.apiUrl + "verifycode", data);
  }

  public resendCode(body): Observable<any> {
    return this.http.get(this.apiUrl + `resend/${body.userId}/${body.phone}`);
  }

  updateUser(data, img, id): Observable<any> {
    const formData: FormData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);

    if (img) {
      formData.append("image", img, "file.jpg");
    }
    var headers = new HttpHeaders();
    headers.append("Accept", "application/text");
    let url = "https://asasa.com/auth/updateProfile/" + id;
    let options = { headers: headers };
    return this.http.put(url, formData, options);
  }
}
