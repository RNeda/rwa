import { TestBed } from '@angular/core/testing';

import { DreamteamService } from './dreamteam.service';

describe('DreamteamService', () => {
  let service: DreamteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DreamteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
