import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import {CanActivateViaOAuthGuard} from "./classes/can-activate-via-oauth-guard";

import { routing } from './app-routing.module';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ElementsListComponent } from './components/elements/elements-list/elements-list.component';
import { AddElementPanelComponent } from './components/add-element-panel/add-element-panel.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavigationBarComponent,
    ElementsListComponent,
    AddElementPanelComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [CanActivateViaOAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
