import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { WorksComponent } from './works/works.component';
import { ComponentsModule } from '../components/components.module';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { ContactComponent } from './contact/contact.component';

import { LottieModule } from 'ngx-lottie'

@NgModule({
  declarations: [
    HomeComponent,
    AboutMeComponent,
    WorksComponent,
    CollaboratorsComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    LottieModule
  ],
  exports: [
    HomeComponent,
    AboutMeComponent,
    WorksComponent,
    CollaboratorsComponent,
    ContactComponent
  ]
})
export class PagesModule { }
