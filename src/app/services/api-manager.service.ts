import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Annonce } from '../annonce/annonce';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.baseUrl;


  getAllClient(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/caisses/"+id);
  }
  getAllCaisse():Observable<any>{
    return this.http.get(this.baseUrl+"/api/caisses/");
  }

  getNextClient(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/next/"+id);
  }
  getCathegoryFilter():Observable<any>{
    return this.http.get(this.baseUrl+"/api/categoryConnected/");
    }
  getCategoryById(id:number):Observable<any>{
    return this.http.get(this.baseUrl+"/api/categoryName/"+id);
  }
  TakeNumber(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/numero/"+id);
  }

  deletePerson(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/persons/"+id);
  }

  addNewcaisse(data:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/addCaisse/",data);
  }
  turnCaisse(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/turnCaisse/"+id);
  }

  getCathegory():Observable<any>{
    return this.http.get(this.baseUrl+"/api/category/");
  }
  uploadFile(file:any):Observable<any>{
    let data={
      name:"video",
      file:file,
    }
    return this.http.post(this.baseUrl+"/api/addVideo",data);
  }

  deconnexion(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/deconnexion/"+id);
  }

  addCategory(cat:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/addCat",cat);
  }
  modifCategory(cat:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/modifCat",cat);
  }
  delCat(type:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/delCat/"+type);
  }
  addAnnonce(annonce:Annonce):Observable<any>{
    return this.http.post(this.baseUrl+'/api/addAnnonce/',annonce);
  }

  getAnnonce():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'/api/annonce/');
  }

  modifyAnnonce(annonce:Annonce):Observable<any>{
    return this.http.post(this.baseUrl+'/api/editAnnonce/',annonce);
  }

  delAnnonce(id:any){
    return this.http.get(this.baseUrl+'/api/delAnnonce/'+id);
  }

}
