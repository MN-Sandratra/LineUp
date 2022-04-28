import { TestBed } from '@angular/core/testing';

import { AffichageSocketService } from './affichage-socket.service';

describe('AffichageSocketService', () => {
  let service: AffichageSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffichageSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
