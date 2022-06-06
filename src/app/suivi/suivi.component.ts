import { Component, OnInit } from '@angular/core';
import { AffichageSocketService } from '../services/affichage-socket.service';
import { ApiManagerService } from '../services/api-manager.service';
import { Caisse } from '../caisse/caisse';
import TTS from 'text-to-speech-offline';
import { VideoplayerService } from '../services/videoplayer.service';
import { data } from 'jquery';
import { Annonce } from '../annonce/annonce';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit {

  private Mysocket:any;
  video:any;
  today=Date.now();
  Annonce:Annonce[]=[];
  PubMessage:string="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum molestias ipsam accusamus tempora architecto fugiat, eos incidunt deserunt assumenda. Expedita deleniti dolorum velit illum libero. Recusandae maxime alias fugit repudiandae!";
  constructor(private api:ApiManagerService,private socket:AffichageSocketService,private apiVideo:VideoplayerService) { }

  ngOnInit(): void {
    setInterval(()=>this.today=Date.now(),1000);
    this.getAllCaisse();
    this.getVideo();
    //setInterval(()=>this.getAllCaisse(),10000);
    this.Mysocket=this.socket.createSocket();
    this.Mysocket.on('speakT',(data:any)=>{
      console.log(data);
      this.speak(data)
    })

    this.Mysocket.on('comptoire',(data:any)=>{
      this.getAllCaisse();
    })

    this.Mysocket.on('annonceReload',(data:any)=>{
      this.getAllAnnonce();
    })

    this.Mysocket.on('videoReload',(data:any)=>{
      console.log("Misy miova an");
      this.getVideo();
    })

    this.getAllAnnonce();
  }

  caisses:Caisse[]=[];
  getVideo(){
    this.apiVideo.getvideo().subscribe(
      data=>{
        this.video=data.reverse();
        console.log(data);
      },err=>{
        console.log("tsy azo ohh");
      }
    )
  }
  getAllCaisse(){
    this.api.getAllcaisser().subscribe(
      data=>{
        this.caisses=data;
      },(err: any)=>{
        console.log(err);
      }
    )
  }

  getAllAnnonce(){
    this.api.getAnnonce().subscribe(
      data=>{
        this.Annonce=data
        this.PubMessage="";
        this.Annonce.reverse().forEach((x:Annonce)=>{
          this.PubMessage+=x.txt+".\t "
        })
      },err=>{
        console.log();
      }
    )
  }

  speak(data:any){
    let texttospeak:string="Le client ayant le numero "+data.numero +"est attendu au comptoire "+data.category+" numero "+ data.currentId;
    TTS(texttospeak,'fr-FR')
  }

}
