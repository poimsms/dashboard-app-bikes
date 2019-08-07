import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ConfigService } from './config.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Subject, BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  apiURL: string;

  rider_query$ = new Subject();

  riders$: Observable<any>;

  id: string;


  constructor(
    private http: HttpClient,
    private _config: ConfigService,
    private db: AngularFirestore
  ) {
    this.apiURL = this._config.apiURL;

    this.riders$ = this.rider_query$.pipe(
      switchMap(tipo =>  {

        if (tipo == 'riders-inactivos') {
          return this.db.collection('riders', ref => ref.where('actividad', '==', 'inactivo')).valueChanges()
        }

        if (tipo == 'riders-activos') {
          return this.db.collection('riders', ref => ref.where('actividad', '==', 'activo')).valueChanges()
        }

        if (tipo == 'riders-todos') {
          return this.db.collection('riders', ref => ref.where('isActive', '==', true)).valueChanges()
        }

        if (tipo == 'rastreo') {
          return this.db.collection('riders', ref => ref.where('rider', '==', this.id)).valueChanges()
        }
      })
    );
    
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

  ridersFirebase(query) {
    this.rider_query$.next(query);
  }
  
  riderToggleAccount(body) {
    const url = `${this.apiURL}/riders/riders-activation`;
    return this.http.put(url, body).toPromise();
  }

  ridersData() {
    const url = `${this.apiURL}/riders/riders-get-all`;
    return this.http.get(url).toPromise();
  }

  crearEmpresa(body) {
    const url = `${this.apiURL}/usuarios/empresa-crear-cuenta-con-admin`;
    return this.http.post(url, body).toPromise();
  }

  buscarRiderByPhone(telefono) {
    const url = `${this.apiURL}/riders/riders-get-one-by-phone?telefono=${telefono}`;
    return this.http.get(url).toPromise();
  }


  // ---------------------------
  //        AUXILIAR
  // ---------------------------

  crearAdmin() {
    const url = `${this.apiURL}/usuarios/admin-signup`;

    const body = {
      cuenta: 293812,
      password: '389203'
    };

    return this.http.post(url, body).toPromise();
  }

  crearBalance() {
    const url = `${this.apiURL}/riders/riders-create-balance`;
    
    const body = {
      rider: '5d3f2e0255266a733cd4242b',
      inicio: 'Lunes 05 - Agosto',
      fin: 'Domingo 11 - Agosto',
      year: 2019
    };

    return this.http.post(url, body).toPromise();
  }
}
