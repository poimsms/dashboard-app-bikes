import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  isErr = false;
  isLoading = false;

  constructor(
    private _auth: AuthService,
    private router: Router
  ) {
    this._auth.authState.subscribe(data => {
      if (data.isAuth) {
        this.router.navigateByUrl('home');
      }
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.email && this.password) {
      this.isLoading = true;
      this._auth.login(this.email, this.password).then(isAuth => {
        if (isAuth) {
          this.isLoading = false;
          this.router.navigateByUrl('home');
        } else {
          this.isLoading = false;
          this.isErr = true;
        }
      });
    }
  }

}
