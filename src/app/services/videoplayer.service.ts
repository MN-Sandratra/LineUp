import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import socketIOClient from 'socket.io-client';
import { valHooks } from 'jquery';

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

  delVideo(video:any):Observable<any>{
    let data={
      name:video.name
    }
    return this.http.post(this.baseUrl+'/api/delVideo/',data)
  }
}

