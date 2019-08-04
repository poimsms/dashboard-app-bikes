import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-operarios',
  templateUrl: './operarios.component.html',
  styleUrls: ['./operarios.component.css']
})
export class OperariosComponent implements OnInit {

  telefono: number;
  password: string;

  vehiculo = 'Seleccionar';

  newRider = false;
  showToastSuccess = false;

  constructor(
    private _data: DataService,
    private _control: ControlService
  ) { 
    this._control.activar('riders');
  }

  ngOnInit() {
  }

  toastPresentSuccess() {
    this.showToastSuccess = true;
    setTimeout(() => {
      this.showToastSuccess = false;
    }, 2000);
  }

  crearNuevoRider() {
    if (this.password && this.telefono) {

      const body = {
        telefono: this.telefono,
        password: this.password
      }

      this._data.crearRider(body).then(() => {
        this.toastPresentSuccess();
        this.newRider = false;
      })
    }
  }
}
