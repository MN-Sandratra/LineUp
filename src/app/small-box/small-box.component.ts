import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-box',
  templateUrl: './small-box.component.html',
  styleUrls: ['./small-box.component.scss']
})
export class SmallBoxComponent implements OnInit {

  @Input() Description:String | undefined;
  @Input() Valeur:any;

  constructor() { }

  ngOnInit(): void {
  }

}
