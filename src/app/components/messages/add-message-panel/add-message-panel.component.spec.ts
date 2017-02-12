/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddMessagePanelComponent } from './add-message-panel.component';

describe('AddMessagePanelComponent', () => {
  let component: AddMessagePanelComponent;
  let fixture: ComponentFixture<AddMessagePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMessagePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMessagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
