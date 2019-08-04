import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControlService } from './services/control.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'control';
  isAuth = false;

  constructor(
    public _control: ControlService,
    private _auth: AuthService,
    private router: Router
    ) {
    this._auth.authState.subscribe(data => {      
      this.isAuth = data.isAuth;
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
