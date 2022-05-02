import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTachometerAlt,faUsersCog, faUsers, faCertificate, faHome, faLifeRing, faUserFriends, faShieldAlt, faUserNinja, faCashRegister, faList, faVideo} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() ncaisse: any;
  myadmin=faUserNinja;
  type:any;
  myUser = {
    name: 'Admin',
    picture: ''
  }
  public menu = MENU;
  public menuAdmin=MENUADMIN;
  currentRoute:any;
  
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.getCurrentRoute();
  }

  getCurrentRoute(){
    this.currentRoute=this.route.url;
    console.log(this.currentRoute);
    let link=this.currentRoute.split('/');
    this.currentRoute=link[2];
    if(this.currentRoute=='admin'){
      this.menu=MENUADMIN
      this.type="Admin"
      this.ncaisse=''
    }else{
      this.menu=MENU
    }
  }

}
export const MENU = [
  {
    name: 'Dashboard',
    icon:faTachometerAlt,
    path: ['./dashboard']
  },
  {
    name: 'Caisse',
    icon:faCashRegister,
    path: ['./caisse']
  }
];

export const MENUADMIN=[
  {
    name: 'Categories',
    icon:faList,
    path: ['./category']
  },
  {
    name: 'Video',
    icon:faVideo,
    path: ['./pub']
  },
  {
    name: 'Annonce',
    icon:faTachometerAlt,
    path: ['./pub']
  }
];
