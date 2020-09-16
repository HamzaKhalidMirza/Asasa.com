import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenPayload } from "../models/token";
import { Observable } from "rxjs";

@Injectable()
export class LoginService {
  public apiUrl: string = "https://www.asasa.com/api/";
  // public apiUrl: string = "  http://localhost:3000/api/";

  userData: any;
  userChange: Subject<any> = new Subject<any>();
  constructor(public http: HttpClient) {}

  public register(user: TokenPayload): Observable<any> {
    // return this.http.post(this.apiUrl + "register", user);

    var headers = new HttpHeaders();
    headers.append("Accept", "application/json");

    let options = { headers: headers };
    return this.http.post("https://www.asasa.com/auth/signup", user, options);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.http.post("https://www.asasa.com/auth/login", user);
  }

  public updateFav(fav): Observable<any> {
    return this.http.post(this.apiUrl + "update_fav", fav);
  }
}
