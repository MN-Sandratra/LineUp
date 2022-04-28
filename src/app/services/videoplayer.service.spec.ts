import { TestBed } from '@angular/core/testing';

import { VideoplayerService } from './videoplayer.service';

describe('VideoplayerService', () => {
  let service: VideoplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
