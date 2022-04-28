import { Component, Input, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ApiManagerService } from '../services/api-manager.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  @Input() Clients:any=[];
  date=new Date();

  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement:DataTableDirective | undefined;
  
  constructor(private api:ApiManagerService) { }
  ngOnInit(): void {
    console.log(this.Clients);
  }

  

}
