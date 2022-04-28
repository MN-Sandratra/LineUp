import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.baseUrl;


  getAllClient(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/caisses/"+id);
  }
  getAllcaisser():Observable<any>{
    return this.http.get(this.baseUrl+"/api/caisses/");
  }

  getNextClient(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/next/"+id);
  }

  TakeNumber():Observable<any>{
    return this.http.get(this.baseUrl+"/api/numero/3");
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
  getCathegoryById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/category/"+id);
  }

  deconnexion(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/deconnexion/"+id);
  }
}
