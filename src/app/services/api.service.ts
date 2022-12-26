import { Injectable } from "@angular/core";
import { Teammates } from "../models/teammates.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, forkJoin, switchMap } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private _refresh$ = new Subject<void>() //* Una subscripcion para actualizar los datos en tiempo real

  url: string = 'http://localhost:3000/'

  constructor(private http: HttpClient) {}

  get refresh$(){ //* La funcion para refrescar los datos
    return this._refresh$
  }

  //! Pasamos un observable de tipo any para sacar del json la propiedad result devuelta en la api
  getAll(table:string): Observable<any> {
    let direction = this.url + table
    return this.http.get<any>(direction)
  }

  putOne(table:string, id:string, teammate:FormData): Observable<any> {
    let direction = this.url + `${table}/${id}`
    return this.http.put<any>(direction, teammate)
      .pipe(
        tap(() => {
          this._refresh$.next() //* lo pasamos en el post
        })
      )
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
