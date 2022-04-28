import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import socketIOClient from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaisseSocketService {

  constructor() { }
  private baseUrl = environment.baseUrl;
  public socket:any;

  createSocket(){
    this.socket=socketIOClient(this.baseUrl);
  }

  sendSpeak(data:any){
    this.socket.emit('speak',data);
  }

}
