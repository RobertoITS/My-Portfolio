import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { WorksComponent } from './works/works.component';
import { ComponentsModule } from '../components/components.module';
import { CollaboratorsComponent } from './collaborators/collaborators.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutMeComponent,
    WorksComponent,
    CollaboratorsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    HomeComponent,
    AboutMeComponent,
    WorksComponent,
    CollaboratorsComponent
  ]
})
export class PagesModule { }
