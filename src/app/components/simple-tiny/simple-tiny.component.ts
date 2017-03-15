import {Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';

export declare var tinymce: any;

@Component({
  selector: 'simple-tiny',
  template: `<textarea id="{{elementId}}"></textarea>`
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: '/assets/skins/lightgray',
      height:400,
      menubar: false,
      setup: editor => {
        this.editor = editor;
        editor.on('blur', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });

      },
    });
  }

  setContent(content: string):void{
    tinymce.activeEditor.setContent(content);
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
