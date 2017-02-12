/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindowRef } from './window-ref.service';

describe('WindowRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRef]
    });
  });

  it('should ...', inject([WindowRef], (service: WindowRef) => {
    expect(service).toBeTruthy();
  }));
});
