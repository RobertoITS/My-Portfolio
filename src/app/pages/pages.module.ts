import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutMeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    AboutMeComponent
  ]
})
export class PagesModule { }
