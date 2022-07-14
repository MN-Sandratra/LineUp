import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RouterComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClientComponent } from './client/client.component';
import { CaisseComponent } from './caisse/caisse.component';
import { SmallBoxComponent } from './small-box/small-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { DataTablesModule } from 'angular-datatables';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SuiviComponent } from './suivi/suivi.component';
import { CardSuiviComponent } from './card-suivi/card-suivi.component';
import { VideoComponent } from './video/video.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { NgxPrintModule } from 'ngx-print';
import { DragDropDirective } from './drag-drop.directive';
import {FileUploadModule} from 'ng2-file-upload';
import { AnnonceComponent } from './annonce/annonce.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { registerLocaleData } from '@angular/common';
import localeFr  from '@angular/common/locales/fr';
import { AcceuilListComponent } from './acceuil-list/acceuil-list.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketItemComponent } from './ticket-item/ticket-item.component'

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    RouterComponent,
    HeaderComponent,
    ClientComponent,
    CaisseComponent,
    SmallBoxComponent,
    MainComponent,
    SidebarComponent,
    MenuItemComponent,
    LoginComponent,
    SuiviComponent,
    CardSuiviComponent,
    VideoComponent,
    AdminComponent,
    CategoryComponent,
    DragDropDirective,
    AnnonceComponent,
    AcceuilComponent,
    AcceuilListComponent,
    TicketsComponent,
    TicketItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgxPrintModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {provide:LOCALE_ID,useValue:'fr'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
