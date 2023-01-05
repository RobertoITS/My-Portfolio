import { Component, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Works } from 'src/app/models/works.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-works',
  templateUrl: './my-works.component.html',
  styleUrls: ['./my-works.component.css']
})
export class MyWorksComponent {
  avatar: string = '' //El avatar del objeto

  img!: any

  float!: any

  @ViewChild("popup") popup!: ElementRef <HTMLDivElement>
  @ViewChild("form") form!: ElementRef <HTMLFormElement>

  //* Buttons
  @ViewChild("put") put!: ElementRef <HTMLButtonElement>
  @ViewChild("post") post!: ElementRef <HTMLButtonElement>
  @ViewChild("delete") del!: ElementRef <HTMLButtonElement>

  //* Inputs
  @ViewChild("title") title!: ElementRef <HTMLInputElement>
  @ViewChild("descrip") descrip!: ElementRef <HTMLInputElement>
  @ViewChild("url") url!: ElementRef <HTMLInputElement>

  //! Lista de objetos
  works!: Works[]
  //El objeto
  work!: Works

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

  ngAfterViewInit(){
    this.img = document.getElementById('avatar')
    this.float = document.getElementById('float')
    this.float.addEventListener('click', () => {
      this.put.nativeElement.classList.add('none')
      this.post.nativeElement.classList.remove('none')
      this.popup.nativeElement.classList.add('visible')
      // Pasamos a base64
      this.toDataURL('../assets/img/page-1.png', (dataUrl: string) => {
        this.avatar = dataUrl
      })

    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  editWork(id:string){
    this.put.nativeElement.classList.remove('none')
    this.post.nativeElement.classList.add('none')
    this.work = this.works.filter(x => x.id == id)[0]
    this.avatar = this.work.img_id

    if(this.avatar == '' || this.avatar == 'null' || this.avatar == null){
      // Pasamos a base64
      this.toDataURL('../assets/img/page-1.png', (dataUrl: string) => {
        this.avatar = dataUrl
      })
    }

    this.title.nativeElement.value = this.work.title
    this.descrip.nativeElement.value = this.work.descrip
    this.url.nativeElement.value = this.work.url
    this.popup.nativeElement.classList.add('visible')

  }

  putData(){

    //* Creamos el body y agregamos los datos
    const body = new FormData()

    const path = this.img.src
    const file = this.dataURLtoFile(path, 'image')

    body.append('id', this.work.id)
    body.append('title', this.title.nativeElement.value)
    body.append('descrip',this.descrip.nativeElement.value)
    body.append('url',this.url.nativeElement.value)
    body.append('file', file) //!

    //* Peticion PUT
    //* Para dos consultas asincronicas, usamos una promesa:
    const promise = new Promise<boolean>/* Devuelve un valor booleano */((resolve, reject) => {
      this.api.putOne('works', this.work.id, body).subscribe(data => {
        if(data.ok){ //* Esto devuelve la API
          resolve(true)
        }
        else {
          reject(false)
        }
      })
    })

    promise.then((status) => {
      if(status){ //* Si el valor es true, continua
        this.api.putFile('works', this.work.id, body).subscribe(data => console.log(data))
      }
    })

    this.closePopUp() //* Cerramos el popUp
  }

  postData(){
    //* Creamos el body y agregamos los datos
    const body = new FormData()

    const path = this.img.src
    const file = this.dataURLtoFile(path, 'image')

    body.append('title', this.title.nativeElement.value)
    body.append('descrip',this.descrip.nativeElement.value)
    body.append('url',this.url.nativeElement.value)
    body.append('file', file) //!

    var id = ""
    //* Peticion POST
    //* Para dos consultas asincronicas, usamos una promesa:
    const promise = new Promise<boolean>/* Devuelve un valor booleano */((resolve, reject) => {
      this.api.postOne('works', body).subscribe(data => {
        if(data.ok){ //* Esto devuelve la API
          id = data.result.insertId
          resolve(true)
        }
        else {
          reject(false)
        }
      })
    })

    promise.then((status) => {
      if(status){ //* Si el valor es true, continua
        this.api.putFile('works', id, body).subscribe(data => console.log(data))
      }
    })

    this.closePopUp() //* Cerramos el popUp
  }

  deleteData(id:string){
    console.log(id);
    if (confirm('Delete this record?')) {
      // Save it!
      const promise = new Promise<boolean>/* Devuelve un valor booleano */((resolve, reject) => {
        this.api.deleteFile('works', id).subscribe(data => {
          if(data.ok){ //* Esto devuelve la API
            resolve(true)
          }
          else {
            reject(false)
          }
        })
      })

      promise.then((status) => {
        if(status){ //* Si el valor es true, continua
          this.api.deleteOne('works', id).subscribe(data => console.log(data))
        }
      })

    } else {
      // Do nothing!

    }
    //
  }


  closePopUp(){
    this.popup.nativeElement.classList.remove('visible')
    this.popup.nativeElement.scrollTop = 0 // Contenedor sroll top
    this.avatar = '' //Vaciamos el avatar
    this.form.nativeElement.reset()
    //! Una vez que se envie el msg, se vacia el campo!!
  }

  // Devuelve un file desde una url
  dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    //Obtenemos el formato del archivo
    var strings = (mime as string).split('/')
    var strings2 = strings[1].split('+')
    var file = new File([u8arr], `${filename}.${strings2[0]}`, {type:mime})
    console.log(file);


    return file
  }

  //Base 64
  toDataURL(url: string, callback:any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  //! Obtiene la imagen desde el servidor 21.12.2022
  toImageObject(file:any, callback: any){
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = callback
  }
}
