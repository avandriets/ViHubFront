import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {ElementsService} from "../../../services/elements.service";
import {Router} from "@angular/router";
import {ElementsListComponent} from "../elements-list/elements-list.component";

@Component({
  selector: 'elements-list-var',
  templateUrl: './elements-list-var.component.html'
})

export class ElementsListVarComponent extends ElementsListComponent{
}
