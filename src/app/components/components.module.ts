import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { FormComponent } from './form/form.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';




@NgModule({
  declarations: [
    CardComponent,
    ProfileCardComponent,
    FormComponent,
    SplashScreenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ProfileCardComponent,
    FormComponent,
    SplashScreenComponent
  ]
})
export class ComponentsModule { }
