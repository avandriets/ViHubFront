/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElementsService } from './elements.service';

describe('ElementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementsService]
    });
  });

  it('should ...', inject([ElementsService], (service: ElementsService) => {
    expect(service).toBeTruthy();
  }));
});
