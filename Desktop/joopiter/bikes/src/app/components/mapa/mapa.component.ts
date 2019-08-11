import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
declare var google: any;


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  map: any;
  directionsService: any;
  directionsDisplay: any;

  origen: any;
  destino: any;

  imageURL = 'https://res.cloudinary.com/ddon9fx1n/image/upload/v1555014076/tools/bike-parking.svg';

  image = {
    url: this.imageURL,
    // This marker is 20 pixels wide by 32 pixels high.
    // size: new google.maps.Size(100, 100),
    scaledSize: new google.maps.Size(40, 40),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.origen = navParams.get('origen');
    this.destino = navParams.get('destino');
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsService = new google.maps.DirectionsService();
  }

  ngOnInit() {
    this.cargarMapa();
  }

  
  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  cargarMapa() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -39.8273053, lng: -63.2171141 },
      zoom: 16,
      disableDefaultUI: true,
      zoomControl: true
    });
    this.directionsDisplay.setMap(this.map);
    this.graficarRuta(this.origen, this.destino);
  }

  graficarRuta(origen, destino) {
    var self = this;

    const origenLatLng = new google.maps.LatLng(origen.lat, origen.lng);
    const destinoLatLng = new google.maps.LatLng(destino.lat, destino.lng);

    this.directionsService.route({
      origin: origenLatLng,
      destination: destinoLatLng,
      travelMode: 'DRIVING',
    }, function (response, status) {
      self.directionsDisplay.setDirections(response);
    })
  }


}
