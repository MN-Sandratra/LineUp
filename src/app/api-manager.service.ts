import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  constructor(private http:HttpClient) { }
  private baseUrl = "http://localhost:7539";


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
    return this.http.get(this.baseUrl+"/api/numero/");
  }

  deletePerson(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/persons/"+id);
  }

  addNewcaisse(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/addCaisse/"+id);
  }
  turnCaisse(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/turnCaisse/"+id);
  }
  deconnexion(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/deconnexion/"+id);
  }
}
