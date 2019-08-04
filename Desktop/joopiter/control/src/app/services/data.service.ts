import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigService } from './config.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  apiURL: string;

  constructor(
    private http: HttpClient,
    private _config: ConfigService,
    private db: AngularFirestore
  ) {
    this.apiURL = this._config.apiURL;
  }

  crearAdmin() {
    const url = `${this.apiURL}/usuarios/admin-signup`;

    const body = {
      cuenta: 293812,
      password: '389203'
    };

    return this.http.post(url, body).toPromise();
  }

  crearRider(body) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiURL}/usuarios/rider-crear-cuenta-con-admin`;
      this.http.post(url, body).toPromise().then((rider: any) => {
        this.crearRiderFirebase(rider);
        this.crearPedidoFirebase(rider._id);
        resolve(true);
      });
    });
  }

  crearRiderFirebase(rider) {
    const data = {
      cliente: '',
      lat: 0,
      lng: 0,
      pedido: '',
      rider: rider._id,
      nombre: rider.nombre,
      telefono: rider.telefono,
      vehiculo: rider.vehiculo,
      tienePedido: false
    }
    this.db.collection("riders").doc(rider._id).set(data);
  }

  crearPedidoFirebase(id) {
    const data = {
      nuevoPedido: false,
      rider: id,
      pedido: ''
    }
    this.db.collection("pedidos_riders").doc(id).set(data);
  }

  getAllRidersFirebase() {
    return this.db.collection('riders').valueChanges();
  }

  crearEmpresa(body) {
    const url = `${this.apiURL}/usuarios/empresa-crear-cuenta-con-admin`;
    return this.http.post(url, body).toPromise();
  }
}
