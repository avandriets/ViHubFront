import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UserVi} from "../../classes/base-objects/user-vi";
import {Utils} from "../../classes/utility/utils";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {WindowRef} from "../../services/window-ref.service";
import {ElementVi} from "../../classes/base-objects/element-vi";
import {Favorite} from "../../classes/base-objects/favorite";
import {ElementsService} from "../../services/elements.service";
import {TransportObject} from "../../classes/base-objects/transport-object";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  providers: [LoginService, WindowRef, ElementsService]
})

export class DashboardComponent implements OnInit, AfterViewInit {

  //@ViewChild(AddElementPanelComponent) addPanelObject: AddElementPanelComponent;
  elementsSet: ElementVi[] = [];

  favoriteSet: Favorite[] = [];
  error: any;
  loading: boolean = true;
  spinnerText: string = "Загрузка данных ...";

  private user: UserVi;
  private first_name: string;
  private last_name: string;
  private email: string;

  constructor(public router: Router,
              private loginService: LoginService,
              private elementService: ElementsService,
              private winRef: WindowRef) {

    this.user = Utils.getCurrentUser();

    if (this.user) {
      this.first_name = this.user.first_name;
      this.last_name = this.user.last_name;
      this.email = this.user.email;
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {

    var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
    for (var i = 0; i < CommandBarElements.length; i++) {
      new this.winRef.nativeWindow.fabric['CommandBar'](CommandBarElements[i]);
    }

    var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
    for (var i = 0; i < CommandButtonElements.length; i++) {
      new this.winRef.nativeWindow.fabric['CommandButton'](CommandButtonElements[i]);
    }

    var DropdownHTMLElements = document.querySelectorAll('.ms-Dropdown');
    for (var i = 0; i < DropdownHTMLElements.length; ++i) {
      var Dropdown = new this.winRef.nativeWindow.fabric['Dropdown'](DropdownHTMLElements[i]);
    }
  }

  getData(): void {
    this.elementService.getElements(-1).then((elements) => {
      this.elementsSet = elements;
      this.loading = false;
    }).catch((error) => {
      console.log(error);
      this.error = error;
      this.loading = false;
    });
    this.elementService.getFavorite().then((favorites) => {
      this.favoriteSet = favorites;
    }).catch((error) => {
      console.log(error);
      this.error = error;
    });

  }

  onDataChange(changerData: TransportObject): void {
    console.log("DashboardComponent onDataChange");
    this.getData();
  }

  gotoDetail(element: ElementVi): void {
    let link = ['/element', element.id];
    this.router.navigate(link);
  }

  // openAddElement(): void {
  //   this.addPanelObject.openPanel();
  // }

}