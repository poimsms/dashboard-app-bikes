import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlService } from './services/control.service';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'control';
  telefono: number;
  isAuth = false;
  riderNotFound = false;

  constructor(
    public _control: ControlService,
    private _data: DataService,
    private _auth: AuthService,
    private router: Router
  ) {
    this._auth.authState.subscribe(data => {
      this.isAuth = data.isAuth;
    });
    this.getRiders('riders-activos');
  }

  getRiders(tipo) {
    this._data.ridersFirebase(tipo);
  }

  trackRider() {

    if (!this.telefono) {
      return;
    }

    this._data.buscarRiderByPhone(this.telefono).then((res: any) => {

      if (res.ok) {
        this._data.id = res.rider._id;
        this._data.ridersFirebase('rastreo');
      } else {
        // rider no encontrado
        this.riderNotFound = true;
        setTimeout(() => {
          this.riderNotFound = false;
        }, 3000);
      }
    });

  }

  openPage(page) {
    this._control.activar(page)
    this.router.navigateByUrl(page);
  }

  logout() {
    this._auth.logout();
  }

}
