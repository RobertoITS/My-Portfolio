import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web'

export function playerFactory(): any{
  return import('lottie-web')
}

import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    ComponentsModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
