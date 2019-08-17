import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ControlService } from 'src/app/services/control.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.css']
})
export class RidersComponent implements OnInit {

  nombre: string;
  email: string;
  telefono: string;
  telefono_search: string;
  password_1: string;
  password_2: string;
  vehiculo = 'Seleccionar';
  relacion = "Seleccionar";

  riders = [];

  error_info_incompleta = false;
  error_telefono = false;
  error_password = false;
  error_vehiculo = false;

  showFiltros = false;
  showBusqueda = false;
  showCrearRider = false;

  periodo = { inicio: '', termino: '' };

  filterOptions = {
    cuenta: 'activada',
    relacion: 'todo',
    inicio: '',
    termino: ''
  }

  phoneOptions = {
    inicio: '',
    termino: ''
  }

  constructor(
    private _data: DataService,
    private _control: ControlService,
    private toastr: ToastrService

  ) {
    this._control.activar('riders');
    this.dateInit();
    this.getRiders();
  }

  ngOnInit() {
  }

  dateInit() {
    const now = new Date().toLocaleDateString('en-GB');
    const dayNow = now.split('/')[0];
    const monthNow = now.split('/')[1];
    const yearNow = now.split('/')[2];

    const now_milliseconds = new Date(Number(yearNow), Number(monthNow) - 1, Number(dayNow)).getTime();
    const past_miliseconds = now_milliseconds - 24 * 60 * 60 * 1000;

    const past = new Date(past_miliseconds).toLocaleDateString('en-GB');
    const dayPast = past.split('/')[0];
    const monthPast = past.split('/')[1];
    const yearPast = past.split('/')[2];

    const start = `${yearPast}-${monthPast}-${dayPast}`;
    const end = `${yearNow}-${monthNow}-${dayNow}`;

    this.filterOptions.inicio = start;
    this.filterOptions.termino = end;

    this.phoneOptions.inicio = start;
    this.phoneOptions.termino = end;

    this.periodo.inicio = `${dayPast}/${monthPast}/${yearPast}`;
    this.periodo.termino = `${dayNow}/${monthNow}/${yearNow}`;

  }

  getRiders() {
    
    this._data.findRiders_using_options(this.filterOptions).then((data: any) => {
      if (data.ok) {
        this.riders = [];
        this.riders = data.riders;
        this.periodo = data.periodo;
        console.log(data.riders, 'riders');
        console.log(this.periodo, 'riders');

      } else {
        // fecha incorrecta
      }
    });
  }


  toggleAccount(rider) {
    this._data.riderToggleAccount(rider).then((res: any) => {
      if (res.activation) {
        this._data.updateRiderFirebase(rider._id, { isActive: false })
        this.toastr.success('El usuario ya puede acceder a la plataforma', 'Cuanta activada');
      } else {
        this.toastr.warning('El usuario no tiene acceso a la plataforma', 'Cuenta bloqueada');
      }
      this.getRiders();
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
      password: this.password_1,
      vehiculo: this.vehiculo,
      relacion: this.relacion
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
    this.telefono = undefined;
    this.nombre = undefined;
    this.email = undefined;
    this.password_1 = undefined;
    this.password_2 = undefined;
    this.vehiculo = 'Seleccionar';
    this.relacion = 'Seleccionar';

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

  filtrar() {
    this.getRiders();
    this.close_filtros();
  }

  buscar() {
    this._data.findRiderByPhone_using_options(this.telefono_search, this.phoneOptions)
      .then((riders: any) => {
        this.riders = riders;
        console.log(riders, 'dd')
        this.close_busqueda();
      });
  }
}

