import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ControlService } from 'src/app/services/control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  title: string = 'My first AGM project';
  lat = -33.444600;
  lng = -70.655585;

  riders = [];

  ridersSubscription$: Subscription;


  constructor(
    private _data: DataService,
    private _auth: AuthService,
    public _control: ControlService
  ) {
    this._control.activar('home');
    this.ridersSubscription$ = this._data.riders$.subscribe(riders => {
      this.riders = riders;
      console.log(riders)
    });
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.ridersSubscription$.unsubscribe();
  }

  crearAdmin() {
    this._data.crearAdmin();
  }

  crearBalance() {
    this._data.crearBalance();
  }

  show() {
    document.getElementById('date').style.display = 'block';

  }




}
