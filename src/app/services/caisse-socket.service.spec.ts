import { TestBed } from '@angular/core/testing';

import { CaisseSocketService } from './caisse-socket.service';

describe('CaisseSocketService', () => {
  let service: CaisseSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaisseSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
