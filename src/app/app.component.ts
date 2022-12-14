import { Component } from '@angular/core';
import * as AOS from 'aos';
import { SplashAnimationType } from './components/splash-screen/splash-animation-type';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-portfolio';
  animation: SplashAnimationType = SplashAnimationType.FadeOut
  ngOnInit() {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
}
