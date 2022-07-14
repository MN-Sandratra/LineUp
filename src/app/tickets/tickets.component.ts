import { Component, OnInit } from '@angular/core';
import { AffichageSocketService } from '../services/affichage-socket.service';
import { ApiManagerService } from '../services/api-manager.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private api:ApiManagerService,private socket:AffichageSocketService) { }
  categories:any[]=[];
  mySocket:any;
  misy=false;
  

  ngOnInit(): void {
    this.getAllCategory()
    this.mySocket=this.socket.createSocket();
    this.mySocket.on('refreshUser',()=>{
      this.getAllCategory();
    })
  }

  getAllCategory(){
    this.api.getCathegoryFilter().subscribe(
      data=>{
        this.categories=data;
        console.log(data);
        this.categories=[...this.categories];
        if(this.categories.length<1){
          this.misy=false
        }else{
          this.misy=true
        }
      },err=>{
        console.log(err);
      }
    )
  }


}
