import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {

  @Input() Menu:any;
  color:any[]=["bg-info","bg-lightblue","bg-teal","bg-purple"]
  currentColor="bg-info";
  path:any="";
  constructor() { }

  ngOnInit(): void {
    this.getCurrentColor();
    this.path=this.createPath();
  }

  getCurrentColor(){
    let nbr=this.color.length;
    let randomnbr=(Math.random()*nbr)
    randomnbr=parseInt(""+randomnbr);
    this.currentColor=this.color[randomnbr];
  }
  createPath(){
    let path='/user/'+this.Menu.type
    return [path]
  }

}
