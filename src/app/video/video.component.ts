import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VideoplayerService } from '../services/videoplayer.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {


  @Input() video:any;
  i=0;
  currentvideo="";
  // myvideo=[
  //   "../../assets/video/video1.mp4",
  //   "../../assets/video/video2.mp4"
  // ]
  myvideo:any;
  constructor(private apivideo:VideoplayerService) { }

  ngOnInit(): void {
    this.getvideo();
    console.log(this.video);
  }

  getvideo(){
    this.apivideo.getvideo().subscribe(
      data=>{
        this.myvideo=data;
        this.myvideo=this.video.map((x:any)=>environment.baseUrl+x.link);
        this.videoPlay(0);
      },err=>{
        console.log("tsy azo fona ehh");
      }
    )
  }
  videoPlay(i:number){
    let myVideo:any=document.getElementById("video");
    this.currentvideo=this.myvideo[i];
    myVideo.muted=true;
    myVideo?.load();
    myVideo.play();
  }

  endedHandler(){
    this.i++
    if(this.i==this.myvideo.length){
      this.i=0;
    }
    console.log("Tapitra ahh");
    this.videoPlay(this.i);
  }

}
