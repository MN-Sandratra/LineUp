import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../api-manager.service';
import { Caisse } from '../caisse';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent implements OnInit {

  constructor(private api:ApiManagerService) { }

  ngOnInit(): void {
    this.getAllCaisse();
    setInterval(()=>this.getAllCaisse(),10000);
  }
  caisses:Caisse[]=[];
  getAllCaisse(){
    this.api.getAllcaisser().subscribe(
      data=>{
        this.caisses=data;
      },err=>{
        console.log(err);
      }
    )
  }

}
