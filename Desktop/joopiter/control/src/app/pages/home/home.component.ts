import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ControlService } from 'src/app/services/control.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  title: string = 'My first AGM project';
  lat = -33.444600;
  lng = -70.655585;

  riders = [];

  constructor(
    private _data: DataService,
    private _auth: AuthService,
    public _control: ControlService
  ) {
    this._control.activar('home');
    this._data.getAllRidersFirebase().subscribe(riders => {
      this.riders = riders;
      console.log(riders)
    });
  }


  ngOnInit() {
  }

  crearAdmin() {
    this._data.crearAdmin();
  }

  


}
