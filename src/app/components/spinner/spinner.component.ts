import {Component, OnInit, Input} from '@angular/core';
import {WindowRef} from "../../services/window-ref.service";

@Component({
  selector: 'spinner-component',
  templateUrl: './spinner.component.html'
})

export class SpinnerComponent implements OnInit {

    @Input() SupportText:string = "Загрузка ...";

    constructor(private winRef: WindowRef) {
    }

    ngOnInit(): void {
        let elements = document.querySelectorAll('.ms-Spinner');
        let i = elements.length;
        let component: any;

        while (i--) {
            component = new this.winRef.nativeWindow.fabric['Spinner'](elements[i]);
        }

    }
}
