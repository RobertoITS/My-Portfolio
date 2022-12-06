import { Component, ViewChild, ElementRef } from '@angular/core';
import  * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
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
      this.container.nativeElement.classList.add('blur')  //! Simplemente le agregamos clases, CSS se encarga del resto
      this.popup.nativeElement.classList.add('visible')
      this.follow.nativeElement.setAttribute('disabled', '')
      this.btn.nativeElement.setAttribute('disabled', '')
      this.follow.nativeElement.classList.add('noHover')
      this.btn.nativeElement.classList.add('noHover')
    })

    //* Cerramos la ventana emergente
    this.send.nativeElement.addEventListener('click', () =>{
      if (this.input.nativeElement.value.length == 0) { //* No se ingresa texto en el input
        this.title.nativeElement.innerHTML = "Alerta!"
        this.msg.nativeElement.innerHTML = "No se ha ingresado texto!"
        this.bg.nativeElement.classList.remove('text-bg-success')
        this.bg.nativeElement.classList.add('text-bg-danger')
        this.msg.nativeElement.classList.remove('text-bg-success')
        this.msg.nativeElement.classList.add('text-bg-danger')
        this.img.nativeElement.setAttribute('src', 'assets/img/alert.png')
        toast2.show()
      } else { //* Texto ingresado
        this.title.nativeElement.innerHTML = "Completado"
        this.msg.nativeElement.innerHTML = "El mensaje se ha enviado con exito!"
        this.bg.nativeElement.classList.add('text-bg-success')
        this.bg.nativeElement.classList.remove('text-bg-danger')
        this.msg.nativeElement.classList.add('text-bg-success')
        this.msg.nativeElement.classList.remove('text-bg-danger')
        this.img.nativeElement.setAttribute('src', 'assets/img/checked.png')
        toast2.show()
      }
      this.closePopUp()
    })

    //* Cerramos la ventana emergente
    this.closePopup.nativeElement.addEventListener('click', () =>{
      this.closePopUp()
    })
  }


  closePopUp(){
    this.container.nativeElement.classList.remove('blur') //* Cerramos la ventana
    this.popup.nativeElement.classList.remove('visible')
    this.follow.nativeElement.removeAttribute('disabled', '')
    this.btn.nativeElement.removeAttribute('disabled', '')
    this.follow.nativeElement.classList.remove('noHover')
    this.btn.nativeElement.classList.remove('noHover')

    //! Una vez que se envie el msg, se vacia el campo!!
    this.input.nativeElement.value = ""
    this.input.nativeElement.setAttribute('style', '') //Resetea el tamaño
  }
}

