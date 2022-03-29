import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SuiviComponent } from './suivi/suivi.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"user",component:UserComponent},
  {path:"main/:id",component:MainComponent,
  children:[
    {path:'dashboard',component:DashboardComponent}
  ]},
  {path:'login',component:LoginComponent},
  {path:'suivi',component:SuiviComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RouterComponent=[UserComponent,DashboardComponent];
