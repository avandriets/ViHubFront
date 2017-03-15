import { Component, OnInit } from '@angular/core';
import {ElementsListComponent} from "../elements-list/elements-list.component";

@Component({
  selector: 'signals-list',
  templateUrl: './signals-list.component.html',
  styleUrls: ['./signals-list.component.scss']
})
export class SignalsListComponent extends ElementsListComponent{
}
