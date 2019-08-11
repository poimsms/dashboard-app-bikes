import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { ControlService } from 'src/app/services/control.service';
import { ModalController } from '@ionic/angular';
import { SignatureComponent } from 'src/app/components/signature/signature.component';
import { MapaComponent } from 'src/app/components/mapa/mapa.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pedido: any;
  pedidoFire: any;
  riderFire: any;

  usuario: any;
  cliente: any;
  token: string;
  isAuth: boolean;

  nuevoPedido = false;
  pedidoCompletado = false;


  constructor(
    private _data: DataService,
    private _auth: AuthService,
    public _control: ControlService,
    public modalController: ModalController
  ) {
    this.usuario = _auth.usuario;
    this.token = _auth.token;
  }

  ngOnInit() {
    this.getPedido();
  }

  async openMapModal() {
    const modal = await this.modalController.create({
      component: MapaComponent,
      componentProps: {
        origen: this.pedido.origen,
        destino: this.pedido.destino
      }
    });

    await modal.present();
  }

  async openSignature() {
    const modal = await this.modalController.create({
      component: SignatureComponent
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data.ok) {

      this._data.confirmar_pedido(this.pedido._id, {img64: data.img64})
        .then(() => {

          this._data.updatePedidoFirebase(this.usuario._id, {
            nuevoPedido: false
          });

          this._data.updateRiderFirebase(this.usuario._id, {
            actividad: 'inactivo',
            isPay: false
          });

          this._data.getBalance(this.usuario._id).then((balance: any) => {

            const newBalance: any = {};

            if (this.pedido.metodoPago == 'Tarjeta') {
              newBalance.ganancia = this.pedido.precio + balance.ganancia;
              newBalance.pedidosTarjeta = balance.pedidosTarjeta + 1;
            } else {
              newBalance.deuda = this.pedido.precio + balance.deuda;
              newBalance.pedidosEfectivo = balance.pedidosEfectivo + 1;
            }

            this._data.updateBalance(balance._id, newBalance);
          });

          this.pedidoCompletado = true;
          this.nuevoPedido = false;

          // solicitar cliente evaluacion
          // agregar pagina de exito

          console.log('listooo');
        });
    }
  }

  getPedido() {
    this._data.getPedidosFirebase(this.usuario._id).subscribe((data: any) => {
      if (data[0].nuevoPedido) {
        this._data.getPedido(data[0].pedido).then((data: any) => {
          if (data.tipo == 'empresa') {
            this.cliente = data.empresa;
          } else {
            this.cliente = data.usuario;
          }
          this.pedido = data.pedido;
          this.nuevoPedido = true;
        });
      } else {
        this.nuevoPedido = false;
      }
    });
  }





}
