import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  telefono: number;
  password: string;

  showToastSuccess = false;
  showToastError = false;
  newEmpresa = false;

  constructor(
    private _control: ControlService,
    private _data: DataService
  ) {
    this._control.activar('empresas');
  }

  ngOnInit() {
  }

  toastPresentSuccess() {
    this.showToastSuccess = true;
    setTimeout(() => {
      this.showToastSuccess = false;
    }, 2000);
  }

  toastPresentError() {
    this.showToastError = true;
    setTimeout(() => {
      this.showToastError = false;
    }, 2000);
  }

  crearNuevaEmpresa() {
    if (this.password && this.telefono) {

      const body = {
        telefono: this.telefono,
        password: this.password
      }

      this._data.crearEmpresa(body).then(() => {
        this.toastPresentSuccess();
        this.newEmpresa = false;
      });
    }
  }

}
