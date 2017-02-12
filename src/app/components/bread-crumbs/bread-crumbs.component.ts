import {Component, OnInit, Input} from '@angular/core';
import {ElementVi} from "../../classes/base-objects/element-vi";
import {Router} from "@angular/router";
import {ElementsService} from "../../services/elements.service";

@Component({
  selector: 'breadcrumbs',
  templateUrl: './bread-crumbs.component.html'
})

export class BreadCrumbsComponent {

    error: any;
    @Input() parentElementsList:ElementVi[] = [];

    constructor(private elementService: ElementsService, private router: Router) {
    }

    gotoElement(element: ElementVi): void {
        if(element != null)
            this.router.navigate(['/element', element.element]);
        else
            this.router.navigate(['/']);
    }
}
