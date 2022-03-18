import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit {

  caisses=[{
    "numero":1,
    "category":"Retrait",
    "statut":"Actif"
  },{
    "numero":2,
    "category":"Retrait",
    "statut":"Actif"
  },{
    "numero":3,
    "category":"Payement",
    "statut":"Actif"
  }
]
  constructor() { }

  ngOnInit(): void {
  }

}
