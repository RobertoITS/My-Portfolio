import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyInterfaceComponent } from './pages/my-interface/my-interface.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TeammatesComponent } from './pages/teammates/teammates.component';
import { MyWorksComponent } from './pages/my-works/my-works.component';
import { MessagesComponent } from './pages/messages/messages.component';

const routes: Routes = [
  { path:'', component: PrincipalComponent },
  { path: 'auth-admin', component: MyInterfaceComponent },
  { path: 'teammates', component: TeammatesComponent },
  { path: 'works', component: MyWorksComponent },
  { path: 'messages', component: MessagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
