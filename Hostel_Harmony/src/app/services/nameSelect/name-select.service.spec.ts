import { TestBed, inject } from '@angular/core/testing';

import { NameSelectService } from './name-select.service';

describe('NameSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NameSelectService]
    });
  });

  it('should be created', inject([NameSelectService], (service: NameSelectService) => {
    expect(service).toBeTruthy();
  }));
});
