import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import  * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {

  @Input("img") img2!: string
  @Input("name") name!: string
  @Input("profession") profession!: string
  @Input("locate") locate!: string
  @Input("facebook") facebook!: string
  @Input("instagram") instagram!: string
  @Input("twitter") twitter!: string
  @Input("link") link!: string
  @Input("linkedin") linkedin!: string
  @Input("git") git!: string

  @ViewChild("message") btn!: ElementRef //! Esta directiva reemplaza el getElementById
  @ViewChild("container") container!: ElementRef //! Ver las etiquetas con el "#", son a las que hacer referencia
  @ViewChild("popup") popup!: ElementRef
  @ViewChild("closePopup") closePopup!: ElementRef
  @ViewChild("sendMsg") send!: ElementRef
  @ViewChild("follow") follow!: ElementRef

  @ViewChild("toast") toast!: ElementRef //! Toast
  @ViewChild("title") title!: ElementRef
  @ViewChild("bodyMsg") msg!: ElementRef
  @ViewChild("bg") bg!: ElementRef
  @ViewChild("img") img!: ElementRef

  @ViewChild("input") input!: ElementRef
  ngAfterViewInit(){
    const toast2 = new bootstrap.Toast(this.toast.nativeElement)
    //* Abrimos la ventana emergente:
    console.log(this.btn);
    this.btn.nativeElement.addEventListener('click', () =>{
      this.container.nativeElement.classList.add('blur', 'disable')  //! Simplemente le agregamos clases, CSS se encarga del resto
      this.popup.nativeElement.classList.add('visible')
    })

    //* Cerramos la ventana emergente
    this.send.nativeElement.addEventListener('click', () =>{
      if (this.input.nativeElement.value.length == 0) { //* No se ingresa texto en el input
        this,this.changeClassList(
          'Alerta!',
          'No se ha ingresado texto!',
          'text-bg-danger',
          'text-bg-success',
          'assets/img/alert.png'
        )
        toast2.show()
      } else { //* Texto ingresado
        this.changeClassList(
          'Completado',
          'El mensaje se ha enviado con exito!',
          'text-bg-success',
          'text-bg-danger',
          'assets/img/checked.png'
          )
        toast2.show()
      }
      this.closePopUp()
    })

    //* Cerramos la ventana emergente
    this.closePopup.nativeElement.addEventListener('click', () =>{
      this.closePopUp()
    })
  }

  changeClassList(title: string, body: string, add: string, remove: string, img: string){
    this.title.nativeElement.innerHTML = title
    this.msg.nativeElement.innerHTML = body
    this.bg.nativeElement.classList.add(add)
    this.bg.nativeElement.classList.remove(remove)
    this.msg.nativeElement.classList.add(add)
    this.msg.nativeElement.classList.remove(remove)
    this.img.nativeElement.setAttribute('src', img)

  }

  closePopUp(){
    this.container.nativeElement.classList.remove('blur', 'disable') //* Cerramos la ventana
    this.popup.nativeElement.classList.remove('visible')

    //! Una vez que se envie el msg, se vacia el campo!!
    this.input.nativeElement.value = ""
    this.input.nativeElement.setAttribute('style', '') //Resetea el tamaño
  }
}

