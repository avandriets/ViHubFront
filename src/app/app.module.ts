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
import { AddElementPanelComponent } from './components/elements/add-element-panel/add-element-panel.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ElementDetailComponent } from './components/element-detail/element-detail.component';
import { DeleteElementDialogComponent } from './components/elements/delete-element-dialog/delete-element-dialog.component';
import { EditElementPanelComponent } from './components/elements/edit-element-panel/edit-element-panel.component';
import { AddMessagePanelComponent } from './components/messages/add-message-panel/add-message-panel.component';
import { DeleteMessageDialogComponent } from './components/messages/delete-message-dialog/delete-message-dialog.component';
import { EditMessagePanelComponent } from './components/messages/edit-message-panel/edit-message-panel.component';
import { AddNotePanelComponent } from './components/notes/add-note-panel/add-note-panel.component';
import { EditNoteDialogComponent } from './components/notes/edit-note-dialog/edit-note-dialog.component';
import { DeleteNoteDialogComponent } from './components/notes/delete-note-dialog/delete-note-dialog.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { ElementsListVarComponent } from './components/elements/elements-list-var/elements-list-var.component';
import { NotesListComponent } from './components/notes/notes-list/notes-list.component';
import { MessagesListComponent } from './components/messages/messages-list/messages-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    NavigationBarComponent,
    ElementsListComponent,
    AddElementPanelComponent,
    SpinnerComponent,
    ElementDetailComponent,
    DeleteElementDialogComponent,
    EditElementPanelComponent,
    AddMessagePanelComponent,
    DeleteMessageDialogComponent,
    EditMessagePanelComponent,
    AddNotePanelComponent,
    EditNoteDialogComponent,
    DeleteNoteDialogComponent,
    BreadCrumbsComponent,
    ElementsListVarComponent,
    NotesListComponent,
    MessagesListComponent
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
