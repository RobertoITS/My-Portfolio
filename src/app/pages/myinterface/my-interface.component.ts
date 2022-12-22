import { Component, ViewChild, ElementRef } from '@angular/core';
import { Teammates } from 'src/app/models/teammates.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-interface',
  templateUrl: './my-interface.component.html',
  styleUrls: ['./my-interface.component.css']
})
export class MyInterfaceComponent {
  avatar: string = '' //El avatar del objeto

  img!: any

  @ViewChild("popup") popup!: ElementRef
  @ViewChild("form") form!: ElementRef

  //* Form elements
  @ViewChild("name") name!:ElementRef
  @ViewChild("l_name") l_name!:ElementRef
  @ViewChild("facebook") facebook!:ElementRef
  @ViewChild("instagram") instagram!:ElementRef
  @ViewChild("git") git!:ElementRef
  @ViewChild("link") link!:ElementRef
  @ViewChild("linkedin") linkedin!:ElementRef
  @ViewChild("locate") locate!:ElementRef
  @ViewChild("profession") profession!:ElementRef
  @ViewChild("twitter") twitter!:ElementRef

  //! Lista de objetos
  teammates!: Teammates[]
  //El objeto
  teammate!: Teammates

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
            element.img_id = ''
          }
        })
      })
      this.teammates = data.result //* Result es una propiedad del json devuelto
    })
  }

  ngAfterViewInit(){
    this.img = document.getElementById('avatar')

    //! Resetea los campos del formulario!!
    //* Con los botones, los reseteamos
    //const btn = document.getElementById('test')
    //btn?.addEventListener('click', () =>{
    //  this.form.nativeElement.reset()
    //})
  }

  editTeammate(id:string){
    this.teammate = this.teammates.filter(x => x.id == id)[0]
    this.avatar = this.teammate.img_id

    if(this.avatar == '' || this.avatar == 'null' || this.avatar == null){
      // Pasamos a base64
      this.toDataURL('../assets/img/mf-avatar.svg', (dataUrl: string) => {
        this.avatar = dataUrl
      })
    }

    this.name.nativeElement.value = this.teammate.name
    this.l_name.nativeElement.value = this.teammate.last_name
    this.facebook.nativeElement.value = this.teammate.facebook
    this.instagram.nativeElement.value = this.teammate.instagram
    this.git.nativeElement.value = this.teammate.github
    this.link.nativeElement.value = this.teammate.link
    this.linkedin.nativeElement.value = this.teammate.linkedin
    this.locate.nativeElement.value = this.teammate.locate
    this.profession.nativeElement.value = this.teammate.profession
    this.twitter.nativeElement.value = this.teammate.twitter
    this.popup.nativeElement.classList.add('visible')

  }

  putData(){
    //* Creamos el body y agregamos los datos
    const body = new FormData()

    const path = this.img.src
    const file = this.dataURLtoFile(path, 'image')

    body.append('id', this.teammate.id)
    body.append('name', this.name.nativeElement.value)
    body.append('last_name',this.l_name.nativeElement.value)
    body.append('facebook',this.facebook.nativeElement.value)
    body.append('instagram',this.instagram.nativeElement.value)
    body.append('github',this.git.nativeElement.value)
    body.append('link',this.link.nativeElement.value)
    body.append('linkedin',this.linkedin.nativeElement.value)
    body.append('locate',this.locate.nativeElement.value)
    body.append('profession',this.profession.nativeElement.value)
    body.append('twitter',this.twitter.nativeElement.value)
    body.append('file', file) //!

    //* Peticion PUT
    //* Para dos consultas asincronicas, usamos una promesa:
    const promise = new Promise<boolean>/* Devuelve un valor booleano */((resolve, reject) => {
      this.api.putOne('teammates', this.teammate.id, body).subscribe(data => {
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
        this.api.putFile('teammates', this.teammate.id, body).subscribe(data => console.log(data))
      }
    })

    this.closePopUp() //* Cerramos el popUp
  }

  closePopUp(){
    this.popup.nativeElement.classList.remove('visible')
    this.popup.nativeElement.scrollTop = 0 // Contenedor sroll top
    this.avatar = '' //Vaciamos el avatar
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

    return new File([u8arr], `${filename}.${strings2[0]}`, {type:mime});
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
