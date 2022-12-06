import { Component, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild("follow") follow!: ElementRef
  ngAfterViewInit(){
    console.log(this.btn);
    this.btn.nativeElement.addEventListener('click', () =>{
      this.container.nativeElement.classList.add('blur')
      this.popup.nativeElement.classList.add('visible')
      this.follow.nativeElement.setAttribute('disabled', '')
      this.btn.nativeElement.setAttribute('disabled', '')
      this.follow.nativeElement.classList.add('noHover')
      this.btn.nativeElement.classList.add('noHover')
    })
    this.closePopup.nativeElement.addEventListener('click', () =>{
      this.container.nativeElement.classList.remove('blur')
      this.popup.nativeElement.classList.remove('visible')
      this.follow.nativeElement.removeAttribute('disabled', '')
      this.btn.nativeElement.removeAttribute('disabled', '')
      this.follow.nativeElement.classList.remove('noHover')
      this.btn.nativeElement.classList.remove('noHover')
    })
  }
}
