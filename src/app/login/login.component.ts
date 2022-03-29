import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiManagerService } from '../api-manager.service';
import { Caisse } from '../caisse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private toast:ToastrService,
    private api:ApiManagerService,
    private route:Router) { }

  caisses:any[]=[];
  formCaisse=this.fb.group({
    caisse:['',Validators.required]
    }
  );

  ngOnInit(): void {
    
  }
  getifCaisseExist(){

  }

  addNewCaisse(id:any){
    this.api.addNewcaisse(id).subscribe(
      data=>{
        let currentroute='/main/'+id+'/dashboard'
        this.route.navigate([currentroute])
      },err=>{
        this.toast.error("impossible d'ajouter une nouvelle caisse")
      }
    )
  }
  getCaisseVerrouiller(id:any){
    this.api.getAllcaisser().subscribe(
      data=>{
        this.caisses=data;
        let nbr:Caisse[]=this.caisses.filter(x=>x.caisse==id);
        console.log(nbr);
        if(nbr.length!==0){
          if(nbr[0].free){
            this.toast.error("Cette caisse est deja actif","erreur")
          }else{
            this.updateCaisseStatus(nbr[0].caisse);
            let currentroute='/main/'+id+'/dashboard';
            this.route.navigate([currentroute])
            return
          }
        }else{
          this.addNewCaisse(id)
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
      this.getCaisseVerrouiller(id);
    }else{
      this.toast.error("il faut bien remplir le numero de caisse","Attention")
    } 
  }
  

}
