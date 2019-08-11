import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  telefono: string;
  error_telefono =  false;
  error_password =  false;
  password: string;
  passwordType = 'password';
  isLoading = false;

  constructor(
    private _auth: AuthService,
    public toastController: ToastController,
    private router: Router
  ) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ya fue enviado un SMS',
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  togglePassword() {
    if ( this.passwordType == 'password') {
      this.passwordType = 'text';

    } else {
      this.passwordType = 'password';
    }
  }


  loginUsuario() {

    if (!Number(this.telefono)) {
      return;
    }

    if (this.telefono.length != 8) {
      return this.error_telefono = true;
    }

    this.error_password =  false;
    this.isLoading = true;
    this._auth.loginIn(this.telefono, this.password).then(ok => {
      if (!ok) {
        this.error_password = true;
      }
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }

}
