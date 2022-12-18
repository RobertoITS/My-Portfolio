import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { FormComponent } from './form/form.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';




@NgModule({
  declarations: [
    CardComponent,
    ProfileCardComponent,
    FormComponent,
    SplashScreenComponent,
    ImageCropperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ProfileCardComponent,
    FormComponent,
    SplashScreenComponent,
    ImageCropperComponent
  ]
})
export class ComponentsModule { }
