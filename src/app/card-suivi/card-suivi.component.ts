import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-suivi',
  templateUrl: './card-suivi.component.html',
  styleUrls: ['./card-suivi.component.scss']
})
export class CardSuiviComponent implements OnInit {

  @Input() caisse: any;
  constructor() { }

  ngOnInit(): void {
  }

}
