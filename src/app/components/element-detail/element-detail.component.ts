import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {TransportObject} from "../../classes/base-objects/transport-object";
import {Params, ActivatedRoute} from "@angular/router";
import {ElementVi} from "../../classes/base-objects/element-vi";
import {AddElementPanelComponent} from "../elements/add-element-panel/add-element-panel.component";
import {ElementsService} from "../../services/elements.service";
import {WindowRef} from "../../services/window-ref.service";
import {MessageVi} from "../../classes/base-objects/message-vi";
import {NoteVi} from "../../classes/base-objects/note-vi";
import {DeleteElementDialogComponent} from "../elements/delete-element-dialog/delete-element-dialog.component";
import {EditElementPanelComponent} from "../elements/edit-element-panel/edit-element-panel.component";
import {AddMessagePanelComponent} from "../messages/add-message-panel/add-message-panel.component";
import {DeleteMessageDialogComponent} from "../messages/delete-message-dialog/delete-message-dialog.component";
import {EditMessagePanelComponent} from "../messages/edit-message-panel/edit-message-panel.component";
import {AddNotePanelComponent} from "../notes/add-note-panel/add-note-panel.component";
import {EditNoteDialogComponent} from "../notes/edit-note-dialog/edit-note-dialog.component";
import {DeleteNoteDialogComponent} from "../notes/delete-note-dialog/delete-note-dialog.component";
import {LoginService} from "../../services/login.service";
import {NotesService} from "../../services/notes.service";
import {MessagesService} from "../../services/messages.service";
import {ViewMemberDialogComponent} from "../members/view-member-dialog/view-member-dialog.component";
import {MembersService} from "../../services/members.service";
import {FilesService} from "../../services/files.service";
import {Attachment} from "../../classes/base-objects/attachment";
import {AddFilePanelComponent} from "../files/add-file-panel/add-file-panel.component";
import {AddFileAction} from "../../classes/base-objects/interfaces";


@Component({
  selector: 'element-detail',
  templateUrl: './element-detail.component.html',
  providers: [
    LoginService, WindowRef, ElementsService,
    NotesService, MessagesService,
    MembersService, FilesService
  ]
})

export class ElementDetailComponent implements OnInit, AfterViewInit, AddFileAction {

  hasError: boolean = false;
  errorMessage: string = "";
  error: any;

  element: ElementVi;

  elementsSet: ElementVi[] = [];

  messagesSet: MessageVi[] = [];
  notesSet: NoteVi[] = [];
  attachmentSet: Array<Attachment> = [];

  breadcrumbs: ElementVi[] = [];

  loading: boolean = true;
  spinnerText: string = "Загрузка данных ...";

  constructor(private elementService: ElementsService,
              private route: ActivatedRoute,
              private winRef: WindowRef,
              private noteService: NotesService,
              private messageService: MessagesService,
              private fileService: FilesService) {
  }

  //Files action
  @ViewChild(AddFilePanelComponent) addFilePanel: AddFilePanelComponent;

  //Element actions
  @ViewChild(DeleteElementDialogComponent) deleteElementDialog: DeleteElementDialogComponent;
  @ViewChild(AddElementPanelComponent) addPanelObject: AddElementPanelComponent;
  @ViewChild(EditElementPanelComponent) editPanelObject: EditElementPanelComponent;

  // //Message actions
  @ViewChild(AddMessagePanelComponent) addMessageObjectPanel: AddMessagePanelComponent;
  @ViewChild(DeleteMessageDialogComponent) deleteMessageDialog: DeleteMessageDialogComponent;
  @ViewChild(EditMessagePanelComponent) editMessagePanel: EditMessagePanelComponent;

  //Note actions
  @ViewChild(AddNotePanelComponent) addNotePanel: AddNotePanelComponent;
  @ViewChild(EditNoteDialogComponent) editNoteDialog: EditNoteDialogComponent;
  @ViewChild(DeleteNoteDialogComponent) deleteNoteDialog: DeleteNoteDialogComponent;

  //USer action
  @ViewChild(ViewMemberDialogComponent) membersViewDialog: ViewMemberDialogComponent;

  onCreateMessage(): void {
    this.addMessageObjectPanel.openPanel();
  }

  onAddNote(): void {
    this.addNotePanel.openPanel();
  }

  openAddElement(): void {
    //this.addPanelObject.openPanel();
    this.addPanelObject.openDialog();
  }

  openEditElementPanel(): void {
    this.editPanelObject.openPanel();
  }

  onClickDeleteElement(): void {
    this.deleteElementDialog.openDialog();
  }

  onClickMembersView(): void {
    this.membersViewDialog.openPanel();
  }

  onAddAttachment(): void {
    this.addFilePanel.clean();
    this.addFilePanel.openPanel();
  }

  onActionAddFile(data: any): void {
    //console.log("onActionAddFile:" + fileName);

    this.addFilePanel.inProcess = true;

    let attach = new Attachment();
    attach.element = this.element.element;
    attach.description = data.description;

    this.fileService.uploadAttachment(attach, data.file)
      .subscribe(
        data => {
          console.log('success');
          this.addFilePanel.inProcess = false;
          //Close panel
          this.addFilePanel.closePanel();
          this.getFiles();
        },
        error => {
          this.addFilePanel.inProcess = false;
          console.log(error);
        }
      );

  }

  ngAfterViewInit(): void {
    var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
    for (var i = 0; i < CommandButtonElements.length; i++) {
      new this.winRef.nativeWindow.fabric['CommandButton'](CommandButtonElements[i]);
    }

    var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
    for (var i = 0; i < CommandBarElements.length; i++) {
      new this.winRef.nativeWindow.fabric['CommandBar'](CommandBarElements[i]);
    }

    var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
    for (var i = 0; i < DropdownHTMLElements.length; ++i) {
      var Dropdown = new this.winRef.nativeWindow.fabric['Dropdown'](DropdownHTMLElements[i]);
    }
  }

  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.elementService.getElementById(id).then(
        (element) => {
          this.element = element;
          this.getData();
          this.getBeadCrumbs();
        }
      );
    });
  }

  private getBeadCrumbs() {
    this.elementService.getBreadcrumbs(this.element.element)
      .then((retCrumbs) => {
        this.breadcrumbs = retCrumbs;
      }).catch((error) => {
      this.error = error;
    });
  }

  getData(): void {
    this.elementService.getElements(this.element.element)
      .then((retElements) => {
        this.elementsSet = retElements;
        this.loading = false;
      }).catch((error) => {
      this.error = error;
      this.loading = false;
    });

    this.messageService.getMessages(this.element.element)
      .then((retMessages) => {
        this.messagesSet = retMessages;
        this.loading = false;
      }).catch((error) => {
      this.error = error;
    });

    this.noteService.getNotes(this.element.element)
      .then((retNotes) => {
        this.notesSet = retNotes;
        this.loading = false;
      }).catch((error) => {
      this.error = error;
    });

    this.getFiles();

  }

  getFiles(): void {

    this.fileService.getFilesList(this.element).subscribe(
      response => {
        this.attachmentSet = response;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );

  }

  dataChange(changerData: TransportObject): void {
    this.getData();
  }
}
