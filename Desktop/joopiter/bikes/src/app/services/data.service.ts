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
    public http: HttpClient,
    private _config: ConfigService,
    private db: AngularFirestore
  ) {
    this.apiURL = this._config.apiURL;
  }

  getPedido(id) {
    const url = `${this.apiURL}/riders/pedidos-get-one?id=${id}`;
    return this.http.get(url).toPromise();
  }

  confirmar_pedido(id, body) {
    const url = `${this.apiURL}/riders/pedidos-confirm?id=${id}`;
    return this.http.put(url, body).toPromise();
  }

  cancelar_pedido(id, body) {
    const url = `${this.apiURL}/riders/pedidos-cancel?id=${id}`;
    return this.http.put(url, body).toPromise();
  }

  updateBalance(id, body) {
    const url = `${this.apiURL}/riders/pedidos-update-balance?id=${id}`;
    return this.http.put(url, body).toPromise();
  }

  getBalance(id) {
    const url = `${this.apiURL}/riders/pedidos-get-balance?id=${id}`;
    return this.http.get(url).toPromise();
  }

  getPedidosFirebase(id) {
    return this.db.collection('pedidos_riders', ref =>
      ref.where('rider', '==', id)).valueChanges();
  }

  updateRiderFirebase(id, newData) {
    this.db.doc('riders/' + id).update(newData);
  }

  updatePedidoFirebase(id, newData) {
    this.db.doc('pedidos_riders/' + id).update(newData);
  }
}
