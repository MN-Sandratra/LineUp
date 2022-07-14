import { Component, OnInit } from '@angular/core';
import {faLock, faTicket,faCashRegister, faTv} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {
  ticket=faTicket;
  comptoire=faCashRegister;
  admin=faLock;
  principal=faTv

  constructor() { }

  menu=[
    {
      designation:"Ticket",
      description:"Retirer un ticket",
      icon:this.ticket,
      path:['/tickets'],
      color:"bg-info"
    },
    {
      designation:"Comptoir",
      description:"Ouvrir un comptoir",
      icon:this.comptoire,
      path:['/login'],
      color:"bg-lightblue"
    },
    {
      designation:"Admin",
      description:"Administrer l'application",
      icon:this.admin,
      path:['/main/admin/category'],
      color:"bg-teal"
    },
    {
      designation:"Principal",
      description:"Afficher l'affichage principal",
      icon:this.principal,
      path:['/suivi'],
      color:"bg-purple"
    },
  ]

  ngOnInit(): void {
  }

}
