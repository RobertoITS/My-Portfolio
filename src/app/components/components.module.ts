import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { FormComponent } from './form/form.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    CardComponent,
    ProfileCardComponent,
    FormComponent,
    SplashScreenComponent,
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    AngularCropperjsModule,
    ImageCropperModule,
    FormsModule
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
