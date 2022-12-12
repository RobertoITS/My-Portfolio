import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('toggle') toggle!: ElementRef
  @ViewChild('navbar') navbar!: ElementRef
  ngAfterViewInit() {

    //! Al hacer click en cualquier area que no sea el header, toggle o el navbar, esconde el menu
    document.onclick = (e) => {
      const element = e.target as HTMLElement;
      if (
        element.id !== 'header' &&
        element.id !== 'toggle' &&
        element.id !== 'navbar'
      ) {
        this.toggle.nativeElement.classList.remove('active');
        this.navbar.nativeElement.classList.remove('active');
      }
    };

    this.toggle.nativeElement.onclick = () => {
      this.toggle.nativeElement.classList.toggle('active');
      this.navbar.nativeElement.classList.toggle('active');
    };
  }
}
