import { Test, TestingModule } from '@nestjs/testing';
import { DreamteamController } from './dreamteam.controller';

describe('DreamteamController', () => {
  let controller: DreamteamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DreamteamController],
    }).compile();

    controller = module.get<DreamteamController>(DreamteamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
