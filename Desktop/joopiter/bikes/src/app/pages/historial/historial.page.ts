import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  tipo = 'resumen';

  constructor(
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['tipo']);
    
    
  }

  openPedido(pedido) {
    this.router.navigateByUrl('historial-one');
  }
 
  segmentChanged(ev: any) {
    this.tipo = ev.detail.value;
  }

}
