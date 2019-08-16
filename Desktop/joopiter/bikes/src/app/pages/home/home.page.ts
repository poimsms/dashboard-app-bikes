import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { ControlService } from 'src/app/services/control.service';
import { ModalController } from '@ionic/angular';
import { SignatureComponent } from 'src/app/components/signature/signature.component';
import { MapaComponent } from 'src/app/components/mapa/mapa.component';
import { Subscription, Subject } from 'rxjs';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pedido: any;
  pedidoFire: any;
  riderFire: any;
  cliente: any;

  usuario: any;
  token: string;
  isAuth: boolean;

  pedidoCompletado = false;
  pedidoActivo = false;
  solicitud = false;

  riderSubscription$: Subscription;

  constructor(
    private _data: DataService,
    private _auth: AuthService,
    public _control: ControlService,
    public modalController: ModalController,
    private _fire: FireService
  ) {
    this.usuario = _auth.usuario;
    this.token = _auth.token;
  }

  ngOnInit() {
    this._fire.getRider(this.usuario._id).subscribe((rider: any) => {

      if (rider.nuevoPedido) {

        this.pedidoActivo = true;

        this._data.getPedido(this.usuario._id).then((data: any) => {
          this.pedido = data.pedido;
          this.cliente = data.cliente;        
        });

      }

      if (rider.solicitud) {

        this.solicitud = true;

      }

    });
  }

  aceptarSolicitud() {
    const data = {
      solicitud: false,
      solicitudAceptada: true,
      nuevoPedido: true
    }
    this._fire.updateRider(this.usuario._id, data);
    // actualizar mongo
  }


  rechazarSolicitud() {
    const data = {
      pagoPendiente: false,
      solicitud: false,
      solicitudAceptada: false
    }
    this._fire.updateRider(this.usuario._id, data);
  }


  async openMapaModal() {
    const modal = await this.modalController.create({
      component: MapaComponent,
      componentProps: {
        origen: this.pedido.origen,
        destino: this.pedido.destino
      }
    });

    await modal.present();
  }

  async openSignatureModal() {
    const modal = await this.modalController.create({
      component: SignatureComponent
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data.ok) {

      this._data.confirmar_pedido(this.pedido._id, { img64: data.img64 })
        .then(() => {

          const data = {
            nuevoPedido: false,
            cliente: '',
            actividad: 'disponible'
          }

          this._fire.updateRider(this.usuario._id, data);

          this.pedidoCompletado = true;

          this.pedidoActivo = false;

          const body: any = {
            rider: this.usuario._id,
            cliente: this.cliente._id,
            tipo: this.cliente.tipo,            
          }

          this._data.createRating(body);

          // push pagina de pedido completado con exito
        });
    }
  }







}
