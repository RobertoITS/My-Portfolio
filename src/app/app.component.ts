import { Component } from '@angular/core';

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-portfolio';
  ngAfterViewInit(){
    const header = document.getElementById('header')
    const toggle = document.getElementById('toggle')
    const navbar = document.getElementById('navbar')

    document.onclick = function(e){
      const element = e.target as HTMLElement
      if(element.id !== 'header' && element.id !== 'toggle' && element.id !== 'navbar'){
        toggle?.classList.remove('active')
        navbar?.classList.remove('active')
      }
    }

    toggle!!.onclick = function(){
      toggle!!.classList.toggle('active')
      navbar!!.classList.toggle('active')
    }
  }
}
