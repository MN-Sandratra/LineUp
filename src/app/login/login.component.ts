import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiManagerService } from '../services/api-manager.service';
import { Caisse } from '../caisse/caisse';
import {Modal} from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { AffichageSocketService } from '../services/affichage-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private toast:ToastrService,
    private api:ApiManagerService,
    private socket:AffichageSocketService,
    private route:Router) { }

  caisses:any[]=[];
  categories:any[]=[];
  modal:any;
  mySocket:any;
  formCaisse=this.fb.group({
    category:['',Validators.required],
    caisse:['',Validators.required]
    }
  );

  ngOnInit(): void {
    this.getAllCategory();
    let ele=document.getElementById("login") as HTMLElement
    this.modal=new Modal(ele);
    this.mySocket=this.socket.createSocket();
  }

  getifCaisseExist(){

  }
  getAllCategory(){
    this.api.getCathegory().subscribe(
      data=>{
        this.categories=data;
        console.log(data);
        this.categories=["",...this.categories];
      },err=>{
        console.log(err);
      }
    )
  }

  addNewCaisse(num:any,cat:any){
    let data={
      num:num,
      cat:cat
    }

    this.api.addNewcaisse(data).subscribe(
      data=>{
        let currentroute='/main/'+cat+"-"+num+'/dashboard'
        console.log(data);
        this.mySocket.emit('addCaisse')
        this.route.navigate([currentroute])
      },err=>{
        console.log(err);
        this.toast.error("impossible d'ajouter une nouvelle caisse")
      }
    )
  }

  goever(){
    let currentroute='/main/'+this.formCaisse.get('category')?.value+"-"+this.formCaisse.get('caisse')?.value+'/dashboard';
    this.route.navigate([currentroute])
  }
  getCaisseVerrouiller(id:any,cat:any){
    this.api.getAllCaisse().subscribe(
      data=>{
        this.caisses=data;
        let nbr:Caisse[]=this.caisses.filter(x=>x.caisse==id && x.type==cat);
        console.log(nbr);
        if(nbr.length!==0){
          if(nbr[0].free){
            this.modal.show();
            //this.toast.error("Cette caisse est deja actif","erreur")
          }else{
            this.updateCaisseStatus(nbr[0].caisse);
            let currentroute='/main/'+cat+"-"+id+'/dashboard';
            this.route.navigate([currentroute])
            return
          }
        }else{
          this.addNewCaisse(id,cat)
        }
      },err=>{
        console.log(err);
      }
    )
  }
  updateCaisseStatus(id:any){
    this.api.turnCaisse(id).subscribe(
      data=>{
        console.log(data);
      },err=>{
        console.log(err);
      }
    )
  }
  onSubmit(){

     if(this.formCaisse.valid){
       console.log(this.formCaisse.value);
      //fonction mambotra caisse
     let id=this.formCaisse.get('caisse')?.value;
     let type=this.formCaisse.get('category')?.value;
     this.getCaisseVerrouiller(id,type);
    }else{
       this.toast.error("il faut bien remplir le numero de caisse","Attention")
    } 
  }
}
