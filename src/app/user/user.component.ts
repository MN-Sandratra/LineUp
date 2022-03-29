import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ApiManagerService } from '../api-manager.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  date:Date=new Date();
  caisses:any[]=[];
  info:any={
    Caisse:0,
    numero:0,
    date:this.date,
  };

  constructor(private api:ApiManagerService,private toast:ToastrService) { }

  ngOnInit(): void {
  }

  getTicket(){
    this.api.TakeNumber().subscribe(
      data=>{
        this.getAllcaisse();
        this.info=data;
      },err=>{
        console.log(err);
      }
    )
  }
   
  getAllcaisse(){
    this.api.getAllcaisser().subscribe(
      data=>{
        this.caisses=data;
        if(this.caisses.length===0){
          this.toast.warning("Aucune caisse n'est encore disponible","Attention")
        }
      },err=>{
        console.log(err);
      }
    )
    }

}
