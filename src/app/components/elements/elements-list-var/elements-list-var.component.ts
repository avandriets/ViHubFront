import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TransportObject} from "../../../classes/base-objects/transport-object";
import {ElementVi} from "../../../classes/base-objects/element-vi";
import {ElementsService} from "../../../services/elements.service";
import {Router} from "@angular/router";

@Component({
  selector: 'elements-list-var',
  templateUrl: './elements-list-var.component.html'
})

export class ElementsListVarComponent implements OnInit {

    error: any;
    @Input() localElements:ElementVi[] = [];
    @Output() onSetFavorite = new EventEmitter<TransportObject>();

    constructor(private elementService: ElementsService, private router: Router) {
    }

    ngOnInit(): void {
        // this.getElements();
    }

    gotoDetail(element: ElementVi): void {
        this.router.navigate(['/element', element.element]);
    }

    changeFavorite(element: ElementVi): void {
        this.elementService.setFavorite(element.element).then((ret)=> {

            let trsObj = new TransportObject();
            trsObj.type = "ChangeFavorite";
            trsObj.object = element;

            this.onSetFavorite.emit(trsObj);
        }).catch((error) => {
            console.log(error);
            this.error = error;
        });
    }
}
