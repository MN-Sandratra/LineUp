import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../api-manager.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clients=[{
    "numero":1,
    "date":"18-03-2022",
    "Heure":"18:00"
  },{
    "numero":2,
    "date":"18-03-2022",
    "Heure":"18:10"
  },
  {
    "numero":3,
    "date":"18-03-2022",
    "Heure":"18:40"
  },
  {
    "Numero":4,
    "Date":"18-03-2022",
    "Heure":"19:00"
  }]
  constructor(private api:ApiManagerService) { }
  ngOnInit(): void {
    this.getClient();
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
