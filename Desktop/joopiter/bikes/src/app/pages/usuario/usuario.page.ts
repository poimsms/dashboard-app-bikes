import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  openPage(param) {
    if (param == 'pagar-deudas') {

    } else {      
      this.router.navigate(['historial', param]);
    }
  }

}
