import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ApiManagerService } from '../services/api-manager.service';
import { NgxPrintModule } from 'ngx-print';
import { AffichageSocketService } from '../services/affichage-socket.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  date:Date=new Date();
  caisses:any[]=[];
  categories:any=[];
  currentCategory:any="";
  currentCategoryId:any="";
  mySocket:any;
  info:any={
    Caisse:0,
    numero:0,
    date:this.date,
  };

  constructor(private api:ApiManagerService,private toast:ToastrService,private socket:AffichageSocketService) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.mySocket=this.socket.createSocket();
    this.mySocket.on('refreshUser',()=>{
      this.getAllCategory();
    })
  }

  getTicket(){
    //print element
    if(this.currentCategory==""){
      this.toast.error("Veuillez selectioner un category","Attention")
    }else{
    this.api.TakeNumber(this.currentCategory).subscribe(
      data=>{
        this.getAllcaisse();
        this.info=data;
        this.getCategoryIdentifiant(this.currentCategory);
      },err=>{
        console.log(err);
      }
    )
  }
  }

  getCategoryIdentifiant(id:any){
    this.api.getCategoryById(id).subscribe(
      data=>{
        this.currentCategoryId=data.id;
        setTimeout(() => {
          let print=document.getElementById("print");
          print?.click();
        }, 1000);
      },err=>{
        console.log(err);
      }
    )
  }

  getAllCategory(){
    this.api.getCathegoryFilter().subscribe(
      data=>{
        this.categories=data;
        console.log(data);
        this.categories=["",...this.categories];
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
