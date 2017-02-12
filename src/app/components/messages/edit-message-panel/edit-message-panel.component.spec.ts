/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditMessagePanelComponent } from './edit-message-panel.component';

describe('EditMessagePanelComponent', () => {
  let component: EditMessagePanelComponent;
  let fixture: ComponentFixture<EditMessagePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMessagePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMessagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
