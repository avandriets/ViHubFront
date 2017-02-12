/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ElementsListVarComponent } from './elements-list-var.component';

describe('ElementsListVarComponent', () => {
  let component: ElementsListVarComponent;
  let fixture: ComponentFixture<ElementsListVarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementsListVarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsListVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
