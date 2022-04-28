import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import socketIOClient from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class VideoplayerService {

  socket:any;
  constructor(private http:HttpClient) { }
  baseUrl=environment.baseUrl;

  getvideo():Observable<any>{
     return this.http.get(this.baseUrl+'/api/video');
  }
  createSocket(){
    this.socket=socketIOClient(this.baseUrl);
  }
  
  sendMangataka(){
    this.socket.emit('mangatakaVideo');
  }
}

