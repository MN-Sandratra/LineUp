import { Component, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { ApiManagerService } from '../services/api-manager.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @HostBinding('class') class = 'wrapper';
    public sidebarMenuOpened = true;
    currentId:Number=0;

  constructor(private renderer: Renderer2,private route:ActivatedRoute ,private api:ApiManagerService,private myroute:Router) { }

  ngOnInit(): void {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'login-page'
    );
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
    this.getSelectedId();
    console.log(this.route.snapshot.paramMap.get('id'));
  }
  getSelectedId=():void=>{
     let id=this.route.snapshot.paramMap.get('id');
     if(id){
       this.currentId=parseInt(id);
     }
  }

  deconnexion=()=>{
    this.getSelectedId();
    this.api.deconnexion(this.currentId).subscribe(
      data=>{
        this.myroute.navigate(["/login"]);
      },err=>{
        console.log(err);
      }
    )
  }
  toggleMenuSidebar() {
    if (this.sidebarMenuOpened) {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.sidebarMenuOpened = false;
    } else {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'sidebar-collapse'
      );
      this.renderer.addClass(
        document.querySelector('app-root'),
        'sidebar-open'
      );
      this.sidebarMenuOpened = true;
    }
  }
}
