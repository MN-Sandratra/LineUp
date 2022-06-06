import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil-list',
  templateUrl: './acceuil-list.component.html',
  styleUrls: ['./acceuil-list.component.scss']
})
export class AcceuilListComponent implements OnInit {

  @Input() Menu:any;
  constructor() { }

  ngOnInit(): void {
  }

}
