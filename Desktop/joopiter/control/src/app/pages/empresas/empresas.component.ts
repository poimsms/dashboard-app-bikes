import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ControlService } from 'src/app/services/control.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  nombre: string;
  direccion: string;
  email: string;
  telefono: number;
  password_1: string;
  password_2: string;

  newEmpresa = false;
  error_crear_empresa = false;

  constructor(
    private _control: ControlService,
    private _data: DataService,
    private toastr: ToastrService
  ) {
    this._control.activar('empresas');

  }

  ngOnInit() {
  }


  crearEmpresa() {
    let todo_bien = false;

    if (this.nombre && this.direccion && this.email && this.telefono && this.password_1) {
      if (Number(this.telefono)) {
        if (this.password_1 == this.password_2) {
          todo_bien = true;
        }
      }
    }

    if (!todo_bien) {
      this.error_crear_empresa = true;
      return;
    }
    
    const body = {
      nombre: this.nombre,
      direccion: this.direccion,
      email: this.email,
      telefono: Number(this.telefono),
      password: this.password_1
    }

    this._data.crearEmpresa(body).then((data: any) => {
      if (data.ok) {
        this.toastr.success('Cuenta creada con exito', 'Nueva empresa');
      } else {
        this.toastr.error('No se logro crear la cuenta', 'Error');
      }
      this.close_crear_empresa();
    });
  }

  close_crear_empresa() {
    this.newEmpresa = false;
    this.error_crear_empresa = false;
    this.telefono = undefined;
    this.nombre = undefined;
    this.direccion = undefined;
    this.email = undefined;
    this.password_1 = undefined;
    this.password_2 = undefined;
  }


}
