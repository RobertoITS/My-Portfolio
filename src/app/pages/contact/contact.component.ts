import { AnimationOptions } from 'ngx-lottie'
import { Component, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  ok: AnimationOptions = {
    path: './assets/lottie/ok.json'
  }
  private animationItem!: AnimationItem

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(){
    const btn = document.getElementById('send-msg')
    const msg = document.getElementById('message-send')
    const form = document.getElementById('form')
    const div = document.getElementById('disable')

    //! Form
    const name = document.getElementById('nameF') as HTMLInputElement
    const lName = document.getElementById('lNameF') as HTMLInputElement
    const email = document.getElementById('emailF') as HTMLInputElement
    const txtArea = document.getElementById('messageF') as HTMLTextAreaElement
    const text = document.getElementById('text-msg')
    const bgc = document.getElementById('message-send')

    btn!!.onclick = () => {
      if (name.value == '' || lName.value == '' || email.value == ''){
        this.ok = { //! Cambia el path!!
          path: './assets/lottie/warning.json'
        }
        text!!.innerText = "Fields need to be completed!"
        bgc?.classList.remove('bg-success')
        bgc?.classList.add('bg-danger')
      } else {
        //! Validacion del mail
        email.value = email.value.trimEnd()
        if (!email.value.includes("@") || !email.value.includes(".com") || email.value.includes(" ")){
          this.ok = { //! Cambia el path!!
            path: './assets/lottie/warning.json'
          }
          text!!.innerText = "Invalid email address!"
          bgc?.classList.remove('bg-success')
          bgc?.classList.add('bg-danger')
        } else {
          this.ok = { //! Cambia el path!!
            path: './assets/lottie/ok.json'
          }
          text!!.innerText = "Message sent!"
          bgc?.classList.add('bg-success')
          bgc?.classList.remove('bg-danger')
          name.value = ''
          lName.value = ''
          email.value = ''
          txtArea.value = ''
        }

      }

      showMsg()


    }



    function showMsg(){ //! Muestra el msg
      msg?.classList.add('visible')
      form?.classList.add('blur')
      div?.classList.add('disable')
      setTimeout(() =>{
        msg?.classList.remove('visible')
        form?.classList.remove('blur')
        div?.classList.remove('disable')
      }, 2000)
    }
  }

  //! Funciones de lottie, inicializador, parar y arrancar
  onAnimate(animationItem: AnimationItem){
    this.animationItem = animationItem
    console.log(animationItem);
  }
  stop(){
    this.ngZone.runOutsideAngular(()=>{
      this.animationItem.stop()
    })
  }

  play(){
    this.ngZone.runOutsideAngular(()=>{
      this.animationItem.play()
    })
  }
}
