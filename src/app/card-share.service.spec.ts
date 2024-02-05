import { TestBed } from '@angular/core/testing';

import { CardShareService } from './card-share.service';

describe('CardShareService', () => {
  let service: CardShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
