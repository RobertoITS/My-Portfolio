import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SplashAnimationType } from './splash-animation-type';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
  encapsulation: ViewEncapsulation.None //!
})
export class SplashScreenComponent {

  windowWidth!: string
  showSplash: boolean = true
  opacityChange: number = 1
  splashTransition!: string

  //! Input para el ingreso de valores
  @Input() animationDuration: number = 0.5
  @Input() duration: number = 3
  @Input() animationType: SplashAnimationType = SplashAnimationType.SlideLeft

  ngOnInit() {
    setTimeout(() => {

      let transitionStyle = ''
      //! Un switch para seleccionar el tipo de animacion, cambia los estilos del div principal
      switch (this.animationType){
        case SplashAnimationType.SlideLeft:
          this.windowWidth = '-' + window.innerWidth + 'px'
          transitionStyle = 'left ' + this.animationDuration + 's'
          break
        case SplashAnimationType.SlideRight:
          this.windowWidth = window.innerWidth + 'px'
          transitionStyle = 'left ' + this.animationDuration + 's'
          break
        case SplashAnimationType.FadeOut:
          transitionStyle = 'opacity ' + this.animationDuration + 's'
          this.opacityChange = 0
          break
        default:
          this.windowWidth = '-' + window.innerWidth + 'px'
          transitionStyle = 'left ' + this.animationDuration + 's'
          break
      }

      this.splashTransition = transitionStyle

      setTimeout(() => {
        this.showSplash = !this.showSplash //! Escondemos el contenedor
      }, this.animationDuration * 1000)

    }, this.animationDuration * 1000)
  }
}
