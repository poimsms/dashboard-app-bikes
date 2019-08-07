import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ControlService } from 'src/app/services/control.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-operarios',
  templateUrl: './operarios.component.html',
  styleUrls: ['./operarios.component.css']
})
export class OperariosComponent implements OnInit {

  nombre: string;
  email: string;
  telefono: string;
  password_1: string;
  password_2: string;
  vehiculo = 'Seleccionar';

  error_crear_rider = false;
  riders = [];

  error_info_incompleta = false;
  error_telefono = false;
  error_password = false;
  error_vehiculo = false;


  showFiltros = false;
  showBusqueda = false;
  showCrearRider = false;

  constructor(
    private _data: DataService,
    private _control: ControlService,
    private toastr: ToastrService

  ) {
    this._control.activar('riders');
    this.getRidersData();
  }

  ngOnInit() {
  }

  getRidersData() {
    this._data.ridersData().then((riders: any) => {
      this.riders = riders;
    });
  }


  toggleAccount(rider) {
    this._data.riderToggleAccount(rider).then((res: any) => {
      if (res.activation) {
        this.toastr.success('El usuario ya puede acceder a la plataforma', 'Cuanta activada');
      } else {
        this.toastr.warning('El usuario ya no podrá acceder a la plataforma', 'Cuenta bloqueada');
      }
    });
  }


  crearRider() {

    this.resetErros();

    if (!(this.nombre && this.email && this.telefono && this.password_1 && this.password_2)) {
      return this.error_info_incompleta = true;
    }

    if (!Number(this.telefono)) {      
      return this.error_telefono = true;
    }

    if (this.telefono.length != 8) {      
      return this.error_telefono = true;
    }

    if (this.password_1 != this.password_2) {
      return this.error_password = true;
    }

    if (this.vehiculo == 'Seleccionar') {
      return this.error_vehiculo = true;
    }

    const body = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      password: this.password_1
    }

    this._data.crearRider(body).then((data: any) => {
      if (data.ok) {
        this.toastr.success('Cuenta creada con exito', 'Nuevo rider');
      } else {
        this.toastr.error('No se logro crear la cuenta', 'Error');
      }
      this.close_crear_rider();
    });
  }

  close_crear_rider() {
    this.showCrearRider = false;
    this.error_crear_rider = false;
    this.telefono = undefined;
    this.nombre = undefined;
    this.email = undefined;
    this.password_1 = undefined;
    this.password_2 = undefined;
    this.vehiculo = 'Seleccionar';

    this.resetErros();
  }

  resetErros() {
    this.error_info_incompleta = false;
    this.error_telefono = false;
    this.error_password = false;
    this.error_vehiculo = false;
  }


  close_busqueda() {
    this.showBusqueda = false;
  }

  close_filtros() {
    this.showFiltros = false;
  }
}
