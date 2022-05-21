import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AdminComponent } from './admin/admin.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SuiviComponent } from './suivi/suivi.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"",component:AcceuilComponent},
  {path:"user",component:UserComponent},
  {path:"main/:id",component:MainComponent,
  children:[
    {path:'dashboard',component:DashboardComponent}
  ]},
  {path:"main",component:MainComponent,
    children:[
      {path:'admin/video',component:AdminComponent},
      {path:'admin/annonce',component:AnnonceComponent},
      {path:'admin/category',component:CategoryComponent}
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
