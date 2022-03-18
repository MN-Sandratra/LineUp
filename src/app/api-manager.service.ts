import { Injectable } from '@angular/core';
import {HttpClient} from'@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  constructor(private http:HttpClient) { }
  private baseUrl = "http://192.168.10.17:7539";


  getAllClient():Observable<any>{
    return this.http.get(this.baseUrl+"/api/caisses/1");
  }

  getNextClient(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/next/"+id);
  }

  updatePerson(pers:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/persons/"+pers.id,pers);
  }

  deletePerson(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/persons/"+id);
  }
}
