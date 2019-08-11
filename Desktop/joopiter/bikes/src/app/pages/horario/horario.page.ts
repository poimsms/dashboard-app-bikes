import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage implements OnInit {

  dias = [
    {
      isActive: false,
      dia: 'Lun',
      horas: []
    },
    {
      isActive: false,
      dia: 'Mar',
      horas: []
    },
    {
      isActive: false,
      dia: 'Mié',
      horas: []
    },
    {
      isActive: false,
      dia: 'Jue',
      horas: []
    },
    {
      isActive: false,
      dia: 'Vie',
      horas: []
    },
    {
      isActive: false,
      dia: 'Sáb',
      horas: []
    },
    {
      isActive: false,
      dia: 'Dom',
      horas: []
    }
  ]

  horas = [
    {
      isActive: false,
      hora: '8:00 - 9:00'
    },
    {
      isActive: false,
      hora: '9:00 - 10:00'
    },
    {
      isActive: false,
      hora: '10:00 - 11:00'
    },
    {
      isActive: false,
      hora: '11:00 - 12:00'
    },
    {
      isActive: false,
      hora: '12:00 - 13:00'
    },
    {
      isActive: false,
      hora: '13:00 - 14:00'
    },
    {
      isActive: false,
      hora: '14:00 - 15:00'
    },
    {
      isActive: false,
      hora: '15:00 - 16:00'
    },
    {
      isActive: false,
      hora: '16:00 - 17:00'
    },
    {
      isActive: false,
      hora: '17:00 - 18:00'
    },
    {
      isActive: false,
      hora: '18:00 - 19:00'
    },
    {
      isActive: false,
      hora: '19:00 - 20:00'
    },
    {
      isActive: false,
      hora: '20:00 - 21:00'
    },
    {
      isActive: false,
      hora: '21:00 - 22:00'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.dias.forEach(dia => {
      dia.horas = JSON.parse(JSON.stringify(this.horas));      
    });
  }

  activarHora(i, j) {
    this.dias[i].horas[j].isActive = !this.dias[i].horas[j].isActive;
  }

  segmentChanged(ev: any) {

    this.dias.forEach(dia => {
      dia.isActive = false;
    });

    this.dias.forEach((dia, i) => {
      if (`ion-sb-${i}` == ev.detail.value) {        
        dia.isActive = true;
      }
    }); 
  }

}
