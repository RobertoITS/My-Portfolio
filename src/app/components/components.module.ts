import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';




@NgModule({
  declarations: [
    CardComponent,
    ProfileCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ProfileCardComponent
  ]
})
export class ComponentsModule { }
