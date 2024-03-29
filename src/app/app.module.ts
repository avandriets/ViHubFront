import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/users/login/login.component';
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
import { ViewMemberDialogComponent } from './components/members/view-member-dialog/view-member-dialog.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import {CanActivateNotSignIn} from "./classes/can-activate-not-sign-in";
import { EditProfileComponent } from './components/users/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/users/change-password/change-password.component';
import { FilesListComponent } from './components/files/files-list/files-list.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { AddFilePanelComponent } from './components/files/add-file-panel/add-file-panel.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { TinymceEditorDirective } from './directives/tiny-editor.directive';
import { ShortTexPipe } from './pipes/short-tex.pipe';
import { SimpleTinyComponent } from './components/simple-tiny/simple-tiny.component';
import { SignalsListComponent } from './components/elements/signals-list/signals-list.component';

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
    MessagesListComponent,
    ViewMemberDialogComponent,
    RegisterUserComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    FilesListComponent,
    DeleteItemComponent,
    AddFilePanelComponent,
    FileUploaderComponent,
    TinymceEditorDirective,
    ShortTexPipe,
    SimpleTinyComponent,
    SignalsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [CanActivateViaOAuthGuard, CanActivateNotSignIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
