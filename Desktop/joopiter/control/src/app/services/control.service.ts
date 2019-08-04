import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  isMapa = true;
  isMapaActivos = true;
  isMapaTodo = false;
  isRiders = false;
  isEmpresas = false;

  constructor(private router: Router) { }

  activar(tipo) {
    if (tipo == 'mapa') {
      this.isMapa = true;
      this.isRiders = false;
      this.isEmpresas = false;
    }
    if (tipo == 'riders') {
      this.isMapa = false;
      this.isRiders = true;
      this.isEmpresas = false;
    }
    if (tipo == 'empresas') {
      this.isMapa = false;
      this.isRiders = false;
      this.isEmpresas = true;      
    }
  }


}
