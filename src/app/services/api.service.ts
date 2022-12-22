import { Injectable } from "@angular/core";
import { Teammates } from "../models/teammates.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, forkJoin, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url: string = 'http://localhost:3000/'

  constructor(private http: HttpClient) {}

  //! Pasamos un observable de tipo any para sacar del json la propiedad result devuelta en la api
  getAll(table:string): Observable<any> {
    let direction = this.url + table
    return this.http.get<any>(direction)
  }

  putOne(table:string, id:string, teammate:FormData): Observable<any> {
    let direction = this.url + `${table}/${id}`
    return this.http.put<any>(direction, teammate)
  }

  //Imagenes:
  getFile(table:string, id:string){
    let direction = this.url + `upload/${table}/${id}`
    console.log(direction)
    return this.http.get(direction, { responseType: 'blob' })
  }

  //Modifica la imagen
  putFile(table:string, id:string, image:any){
    let direction = this.url + `upload/${table}/${id}`
    return this.http.put(direction, image)
  }
}
