import { Component, OnInit } from '@angular/core';
import { faArrowRight, faLock, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import TTS from 'text-to-speech-offline';
import { ApiManagerService } from '../api-manager.service';

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
  constructor(private api:ApiManagerService) { }

  clients:any[]=[];
  ngOnInit(): void {
    this.getClient();
  }

  speak(){
    let texttospeak:string="Le client ayant le numero "+this.clients[0].numero +"est attendu a la caisse numero"+1;
    TTS(texttospeak,'fr-FR')
  }

  getNextClient(id:number){
    this.api.getNextClient(1).subscribe(
      data=>{
        this.getClient();
      },err=>{
        console.log(err);
      }
    );
  }

  getClient(){
    this.api.getAllClient().subscribe(
      data=>{
        this.clients=data;
      },
      err=>{
        console.log(err);
      }
    )
  }
}
