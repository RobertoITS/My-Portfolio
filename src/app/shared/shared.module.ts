import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FloatButtonComponent } from './float-button/float-button.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FloatButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    FloatButtonComponent
  ]
})
export class SharedModule { }
