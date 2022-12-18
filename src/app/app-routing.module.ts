import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyInterfaceComponent } from './pages/myinterface/my-interface.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  { path:'', component: PrincipalComponent },
  { path: 'auth-admin', component: MyInterfaceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
