import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SuiviComponent } from './suivi/suivi.component';
import { CardSuiviComponent } from './card-suivi/card-suivi.component';

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
    CardSuiviComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
