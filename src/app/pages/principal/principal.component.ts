import { Component } from '@angular/core';
import * as AOS from 'aos';
import { SplashAnimationType } from 'src/app/components/splash-screen/splash-animation-type';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  animation: SplashAnimationType = SplashAnimationType.FadeOut
  ngOnInit() {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
}
