import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Teammates } from 'src/app/models/teammates.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent {

  //! Lista de objetos
  teammates!: Teammates[]

  subscription!: Subscription

  constructor(private api: ApiService){}

  ngOnInit(){
    //! Obtengo todos los datos! 21.12.2022
    this.api.getAll('teammates').subscribe((data) => {
      data.result.forEach((element: any, index: any) => {
        this.api.getFile('teammates', element.id).subscribe((data) => {
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
      this.teammates = data.result //* Result es una propiedad del json devuelto
    })

    this.subscription = this.api.refresh$.subscribe(() => { //! Hacemos una subscripcion para actualizar datos en tiempo real
      //! Obtengo todos los datos! 21.12.2022
      this.api.getAll('teammates').subscribe((data) => {
        data.result.forEach((element: any, index: any) => {
          this.api.getFile('teammates', element.id).subscribe((data) => {
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
        this.teammates = data.result //* Result es una propiedad del json devuelto
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
