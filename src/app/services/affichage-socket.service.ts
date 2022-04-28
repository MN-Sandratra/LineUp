import { Injectable } from '@angular/core';
import socketIOClient from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffichageSocketService {

  constructor() { }
  private baseUrl = environment.baseUrl;
  public socket:any;

  createSocket(){
    return socketIOClient(this.baseUrl);
  }
}
