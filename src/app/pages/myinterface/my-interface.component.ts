import { Component, ViewChild, ElementRef } from '@angular/core';
import { Teammates } from 'src/app/models/teammates.interface';
import { ApiService } from 'src/app/services/api.service';


import {NgForm, ReactiveFormsModule}                        from '@angular/forms';
import {FormControl,FormGroup,Validators}                                from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-my-interface',
  templateUrl: './my-interface.component.html',
  styleUrls: ['./my-interface.component.css']
})
export class MyInterfaceComponent {


  //* la idea seria abrir un componente oculto que muestre el cortado de imagen

  imgChangeEvt: any = '';
    cropImgPreview: any = "assets/img/comments.png";
    onFileChange(event: any): void {
        this.imgChangeEvt = event;
    }
    cropImg(e: ImageCroppedEvent) {
        this.cropImgPreview = e.base64;
    }
    imgLoad() {
        // display cropper tool
    }
    initCropper() {
        // init cropper
    }
    imgFailed() {
        // error msg
    }




  @ViewChild("popup") popup!: ElementRef
  @ViewChild("closePopup") closePopup!: ElementRef
  @ViewChild("form") form!: ElementRef
  @ViewChild("ok") ok!: ElementRef

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

  teammates!: Teammates[]
  constructor(private api: ApiService, private sanitizer: DomSanitizer){}
  ngOnInit(){
    this.api.getAll().subscribe(data => {
      console.log(data)
      this.teammates = data.result //* Result es una propiedad del json devuelto
    })
  }

  ngAfterViewInit(){
    //* Cerramos la ventana emergente
    this.closePopup.nativeElement.addEventListener('click', () =>{
      this.closePopUp()
    })

    //! Resetea los campos del formulario!!
    //* Con los botones, los reseteamos
    //const btn = document.getElementById('test')
    //btn?.addEventListener('click', () =>{
    //  this.form.nativeElement.reset()
    //})
  }

  editTeammate(id:string){
    let teammate: Teammates = this.teammates.filter(x => x.id == id)[0]
    console.log(teammate);
    //* Cargamos los campos
    this.name.nativeElement.value = teammate.name
    this.l_name.nativeElement.value = teammate.last_name
    this.facebook.nativeElement.value = teammate.facebook
    this.instagram.nativeElement.value = teammate.instagram
    this.git.nativeElement.value = teammate.github
    this.link.nativeElement.value = teammate.link
    this.linkedin.nativeElement.value = teammate.linkedin
    this.locate.nativeElement.value = teammate.locate
    this.profession.nativeElement.value = teammate.profession
    this.twitter.nativeElement.value = teammate.twitter
    this.popup.nativeElement.classList.add('visible')

    this.ok.nativeElement.addEventListener('click', () => {
      //*Creamos el objeto
      let eTeammate: Teammates = {
        id:teammate.id,
        name:this.name.nativeElement.value,
        last_name:this.l_name.nativeElement.value,
        facebook:this.facebook.nativeElement.value,
        instagram:this.instagram.nativeElement.value,
        github:this.git.nativeElement.value,
        link:this.link.nativeElement.value,
        linkedin:this.linkedin.nativeElement.value,
        locate:this.locate.nativeElement.value,
        profession:this.profession.nativeElement.value,
        twitter:this.twitter.nativeElement.value,
        img_id:"asd"
      }
      console.log(eTeammate);
      //* Peticion PUT
      this.api.putOne(teammate.id, teammate).subscribe(res => {
        console.log(res);
      })
    })
  }

  closePopUp(){
    this.popup.nativeElement.classList.remove('visible')

    //! Una vez que se envie el msg, se vacia el campo!!
  }
}
