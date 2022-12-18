import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { WorksComponent } from './works/works.component';
import { ComponentsModule } from '../components/components.module';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { ContactComponent } from './contact/contact.component';

import { LottieModule } from 'ngx-lottie';
import { MyInterfaceComponent } from './myinterface/my-interface.component';
import { PrincipalComponent } from './principal/principal.component'
import { SharedModule } from '../shared/shared.module';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    HomeComponent,
    AboutMeComponent,
    WorksComponent,
    CollaboratorsComponent,
    ContactComponent,
    MyInterfaceComponent,
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    LottieModule,
    SharedModule,
    ImageCropperModule
  ],
  exports: [
    HomeComponent,
    AboutMeComponent,
    WorksComponent,
    CollaboratorsComponent,
    ContactComponent,
    MyInterfaceComponent
  ]
})
export class PagesModule { }
