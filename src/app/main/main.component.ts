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
    currentId:any;
    currentRoute:any;
    deconnexion:any;
    category:any[]=[];

    currentCatId:number;
    currentCat:any="";
    currentID:any="";

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
    this.getCurrentRoute();
  }
  getSelectedId=():void=>{
     let id=this.route.snapshot.paramMap.get('id');
     if(id){
       this.currentId=id;
       let ids=this.currentId.split('-');
       this.currentCatId=ids[0];
       this.currentID=ids[1];
       this.getAllCathegory();
       console.log(this.currentId);
     }
  }

  getAllCathegory(){
    this.api.getCathegory().subscribe(
      data=>{
        this.category=data.content;
        console.log(this.category);
        this.currentCat=this.category.filter(x=>x.type==this.currentCatId);
        this.currentCat=this.currentCat[0].category+" "+this.currentID
      },err=>{
        console.log(err);
      }
    )
  }
  getCurrentRoute(){
    this.currentRoute=this.myroute.url;
    console.log(this.currentRoute);
    let link=this.currentRoute.split('/');
    this.currentRoute=link[2];
    if(this.currentRoute=='admin'){
      this.deconnexion=this.deconnexionAdmin;
    }else{
      this.deconnexion=this.deconnexionComptoire;
    }
  }
  deconnexionAdmin=()=>{
    this.myroute.navigate(["/"]);
  }

  deconnexionComptoire=()=>{
    this.getSelectedId();
    console.log(this.currentId);
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
