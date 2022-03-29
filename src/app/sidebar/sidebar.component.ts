import { Component, Input, OnInit } from '@angular/core';
import { faTachometerAlt,faUsersCog, faUsers, faCertificate, faHome, faLifeRing, faUserFriends, faShieldAlt, faUserNinja, faCashRegister} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() ncaisse: any;
  myadmin=faUserNinja;
  myUser = {
    name: 'Admin',
    picture: ''
  }
  public menu = MENU;
  constructor() { }

  ngOnInit(): void {
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
