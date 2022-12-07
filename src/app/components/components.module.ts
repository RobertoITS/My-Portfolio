import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { FormComponent } from './form/form.component';




@NgModule({
  declarations: [
    CardComponent,
    ProfileCardComponent,
    FormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    ProfileCardComponent,
    FormComponent
  ]
})
export class ComponentsModule { }
