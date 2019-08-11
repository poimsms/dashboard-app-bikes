import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string;
  usuario: any;
  token: string;
  authState = new BehaviorSubject({ isAuth: false, usuario: {} });

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private storage: Storage,
    private _config: ConfigService
  ) {
    platform.ready().then(() => {
      this.loadStorage();
    });
    this.apiURL = this._config.apiURL;

  }


  loginIn(telefono, password) {
    return new Promise((resolve, reject) => {
      this.signIn(telefono, password).then((res: any) => {
        if (res.ok) {
          this.saveStorage(res.usuario, res.token, res.usuario._id);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  logout() {
    this.removeStorage();
    this.usuario = {};
    this.token = '';
    this.authState.next({ isAuth: false, usuario: {} });
  }

  saveFlowOrderStorage(order) {
    localStorage.setItem("order", JSON.stringify(order));
  }

  removeStorage() {
    if (this.platform.is("cordova")) {
      this.storage.remove("authData");
    } else {
      localStorage.removeItem("authData");
    }
  }

  saveStorage(usuario, token, uid) {
    const authData = { token, uid };

    if (this.platform.is("cordova")) {
      this.storage.set("authData", JSON.stringify(authData));
      this.authState.next({ isAuth: true, usuario });
    } else {
      localStorage.setItem("authData", JSON.stringify(authData));
      this.authState.next({ isAuth: true, usuario });
    }
  }

  loadStorage() {
    if (this.platform.is('cordova')) {
      this.storage.get('authData').then(res => {

        if (res) {

          const token = JSON.parse(res).token;
          const uid = JSON.parse(res).uid;

          this.getUser(token, uid).then(usuario => {
            this.usuario = usuario;
            this.token = token;
            this.authState.next({ isAuth: true, usuario });
          });
        } else {
          const usuario = {};
          this.authState.next({ isAuth: false, usuario });
        }
      });
    } else {
      if (localStorage.getItem('authData')) {
        const res = localStorage.getItem('authData');
        const token = JSON.parse(res).token;
        const uid = JSON.parse(res).uid;

        this.getUser(token, uid).then(usuario => {
          this.usuario = usuario;
          this.token = token;
          this.authState.next({ isAuth: true, usuario });
        });

      } else {
        const usuario = {};
        this.authState.next({ isAuth: false, usuario });
      }
    }
  }

  signIn(telefono, password) {
    const url = `${this.apiURL}/usuarios/rider-signin`;
    const body = { telefono, password };
    return this.http.post(url, body).toPromise();
  }

  getUser(token, id) {
    const url = `${this.apiURL}/usuarios/rider-get-one?id=${id}`;
    const headers = new HttpHeaders({
      Authorization: `JWT ${token}`
    });
    return this.http.get(url, { headers }).toPromise();
  }


}
