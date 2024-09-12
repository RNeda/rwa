import { Test, TestingModule } from '@nestjs/testing';
import { DreamteamService } from './dreamteam.service';

describe('DreamteamService', () => {
  let service: DreamteamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DreamteamService],
    }).compile();

    service = module.get<DreamteamService>(DreamteamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
