import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'
import { YourGuard } from './your-guard.guard';
import { SecondaryPageComponent } from './secondary-page/secondary-page.component';
import { ConnexionFormModule } from './connexion-form/connexion-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageModule } from './main-page/main-page.module';
import { AdminGuard } from './main-page/admin.guard';
import { ValidTokenGuard } from './main-page/valid-token.guard';

@NgModule({
  imports:      [ BrowserModule,AppRoutingModule, ConnexionFormModule, ReactiveFormsModule, MainPageModule],
  declarations: [ AppComponent, HelloComponent, SecondaryPageComponent],
  bootstrap:    [ AppComponent ],
  providers: [YourGuard,AdminGuard,ValidTokenGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
