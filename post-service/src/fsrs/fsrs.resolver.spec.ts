import { Test, TestingModule } from '@nestjs/testing';
import { FsrsResolver } from './fsrs.resolver';
import { FsrsService } from './fsrs.service';

describe('FsrsResolver', () => {
  let resolver: FsrsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FsrsResolver, FsrsService],
    }).compile();

    resolver = module.get<FsrsResolver>(FsrsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
