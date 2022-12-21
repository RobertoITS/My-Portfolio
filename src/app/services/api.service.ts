import { Injectable } from "@angular/core";
import { Teammates } from "../models/teammates.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url: string = 'http://localhost:3000/'

  constructor(private http: HttpClient) {}

  //! Pasamos un observable de tipo any para sacar del json la propiedad result devuelta en la api
  getAll(): Observable<any> {
    return this.http.get<any>(this.url)
  }

  putOne(id:string, teammate:FormData): Observable<any> {
    let direction = this.url + id
    return this.http.put<any>(direction, teammate)
  }
}
