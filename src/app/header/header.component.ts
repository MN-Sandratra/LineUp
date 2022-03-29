import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBars, faPowerOff, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  @Input() deconnexion: any;
  faBars=faBars;
  faSearch=faSearch;
  fapoweroff=faPowerOff;

  constructor() { }

  ngOnInit(): void {
    
  }
  

}
