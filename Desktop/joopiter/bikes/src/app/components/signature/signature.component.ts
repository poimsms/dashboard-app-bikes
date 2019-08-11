import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions = {
    minWidth: 3,
    canvasWidth: 500,
    canvasHeight: 300
  };

  constructor(public modalCtrl: ModalController) {
    this.signaturePadOptions.canvasWidth = window.innerWidth;
    this.signaturePadOptions.canvasHeight = window.innerHeight - 150;
  }

  close() {
    this.modalCtrl.dismiss({
      ok: false
    });
  }

  save() {
    this.modalCtrl.dismiss({
      ok: true,
      img64: this.signaturePad.toDataURL()
    });
  }

  drawClear() {
    this.signaturePad.clear();
  }

  ngOnInit() {
  }

}
