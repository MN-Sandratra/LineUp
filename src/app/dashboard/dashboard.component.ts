import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faLock, faLockOpen, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import TTS from 'text-to-speech-offline';
import { ApiManagerService } from '../api-manager.service';
import { Caisse } from '../caisse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //TTS=TTS;
  fanext=faArrowRight;
  facall=faVolumeHigh;
  fadeco=faLock;
  facon=faLockOpen;
  currentId!:number;
  currentFree="Verrouiller la caisse";
  caisseStatus=true;

  constructor(private api:ApiManagerService ,private route:ActivatedRoute,private toast:ToastrService
    ,private myroute:Router) { }

  clients:any[]=[];
  ngOnInit(): void {
    this.getcurrentId();
    this.getClient();
    this.getdataSecond();
    this.getStatus();
  }
  getcurrentId(){
    let id=this.route.parent?.snapshot.paramMap.get('id');
    console.log(id);
    if(id){
      this.currentId=parseInt(""+this.route.parent?.snapshot.paramMap.get('id'));
    }
  }
  speak(){
    let texttospeak:string="Le client ayant le numero "+this.clients[0].numero +"est attendu a la caisse numero"+this.currentId;
    TTS(texttospeak,'fr-FR')
  }

  getNextClient(id:number){
    this.api.getNextClient(this.currentId).subscribe(
      data=>{
        this.getClient();
        setTimeout(() => {
          this.speak();
        },500 );
      },err=>{
        console.log(err);
      }
    );
  }
  getdataSecond(){
    setInterval(()=>this.getClient(),5000)
  }

  getClient(){
    this.api.getAllClient(this.currentId).subscribe(
      data=>{
        this.clients=data;
      },
      err=>{
        console.log(err);
      }
    )
  }
  getStatus(){
    this.api.getAllcaisser().subscribe(
      data=>{
        let caisses:Caisse[]=data;
        let currentCaisse=caisses.filter(x=>x.caisse==this.currentId);
        if(currentCaisse.length!=0){
          this.caisseStatus=currentCaisse[0].free;
          if(this.caisseStatus){
            this.currentFree="Verrouiller la caisse"
          }else{
            this.currentFree="Deverroiller la caisse"
          }
        }
      }
    )
  }

  updateCaisseStatus(){
    this.api.turnCaisse(this.currentId).subscribe(
      data=>{
        this.getStatus();
        this.toast.info("vous venez de "+this.currentFree,"information")
      },err=>{
        console.log(err);
      }
    )
  }

  deconnexion(){
    if(this.caisseStatus){
      this.api.turnCaisse(this.currentId).subscribe(
        data=>{
          this.getStatus();
          this.myroute.navigate(['/login'])
        }
      )
    }
    this.toast.info("vous etes deconnecter","Info")
  }
}
