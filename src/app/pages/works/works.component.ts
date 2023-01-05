import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Works } from 'src/app/models/works.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent {
//! Lista de objetos
works!: Works[]

subscription!: Subscription

constructor(private api: ApiService){}

ngOnInit(){
  //! Obtengo todos los datos! 21.12.2022
  this.api.getAll('works').subscribe((data) => {
    data.result.forEach((element: any, index: any) => {
      this.api.getFile('works', element.id).subscribe((data) => {
        console.log(data);
        if(data.type != 'application/json'){ //* Si lo que se devuelve es un json, es xq no existe la imagen en el server
          this.toImageObject(data, function(e:any){
            element.img_id = e.target.result as string
          })
        }
        else {
          element.img_id = '../assets/img/add.png' //* Cargamos una imagen predeterminada
        }
      })
    })
    this.works = data.result //* Result es una propiedad del json devuelto
  })

  this.subscription = this.api.refresh$.subscribe(() => { //! Hacemos una subscripcion para actualizar datos en tiempo real
    //! Obtengo todos los datos! 21.12.2022
    this.api.getAll('works').subscribe((data) => {
      data.result.forEach((element: any, index: any) => {
        this.api.getFile('works', element.id).subscribe((data) => {
          console.log(data);
          if(data.type != 'application/json'){ //* Si lo que se devuelve es un json, es xq no existe la imagen en el server
            this.toImageObject(data, function(e:any){
              element.img_id = e.target.result as string
            })
          }
          else {
            element.img_id = '../assets/img/add.png' //* Cargamos una imagen predeterminada
          }
        })
      })
      this.works = data.result //* Result es una propiedad del json devuelto
    })
  })
}

 //! Obtiene la imagen desde el servidor 21.12.2022
toImageObject(file:any, callback: any){
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = callback
}
}
