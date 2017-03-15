import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsListComponent } from './signals-list.component';

describe('SignalsListComponent', () => {
  let component: SignalsListComponent;
  let fixture: ComponentFixture<SignalsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
