import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faLock, faLockOpen, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import TTS from 'text-to-speech-offline';
import { Caisse } from '../caisse/caisse';
import { ApiManagerService } from '../services/api-manager.service';
import { CaisseSocketService } from '../services/caisse-socket.service';

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
  categories:any[]=[];
  currentId!:number;
  currentCatId!:number;
  currentCat!:String ;
  currentFree="Verrouiller la caisse";
  caisseStatus=true;

  constructor(private api:ApiManagerService ,private route:ActivatedRoute,private toast:ToastrService
    ,private myroute:Router,private caisseSocket:CaisseSocketService) { }

  clients:any[]=[];
  ngOnInit(): void {
    this.getcurrentId();
    this.getClient();
    this.getdataSecond();
    this.getStatus();
    this.caisseSocket.createSocket();
  }
  async getcurrentId(){
    let id=this.route.parent?.snapshot.paramMap.get('id');
    console.log(id);
    let ids=id?.split('-');
    this.getcat();
    if(ids){
      this.currentId=parseInt(""+ids[1]);
      this.currentCatId=parseInt(""+ids[0]);
    }
  }
  getcat(){
    this.api.getCathegory().subscribe(
      data=>{
        this.categories=data.content;
        let id=this.route.parent?.snapshot.paramMap.get('id');
        let ids=id?.split('-');
        if(ids){
          this.currentId=parseInt(""+ids[1]);
          this.currentCatId=parseInt(""+ids[0]);
        }

        let cat=this.categories.filter((x:any)=>x.type===this.currentCatId)
        this.currentCat=cat[0].category
        console.log(this.currentCat);
      },err=>{
        console.log(err);
      }
    )
  }
  speak(){
    let texttospeak:string="Le client ayant le numero "+this.clients[0].numero +"est attendu a la caisse numero"+this.currentId;
    TTS(texttospeak,'fr-FR')
  }

  sendSpeak(){
    let cat=this.categories.filter(x=>x.type==this.currentCatId)
    let data={
      category:cat[0].category,
      numero:this.clients[0].numero,
      currentId:this.currentId,
    }
    this.caisseSocket.sendSpeak(data);
  }

  getNextClient(id:number){
    let fullId=this.currentCatId+'-'+this.currentId;
    this.api.getNextClient(fullId).subscribe(
      data=>{
        this.getClient();
        setTimeout(() => {
          //this.speak();
          this.sendSpeak();
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
    this.api.getAllClient(this.currentCatId+"-"+this.currentId).subscribe(
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
