import { Module } from '@nestjs/common';
import { FsrsService } from './fsrs.service';
import { FsrsResolver } from './fsrs.resolver';

@Module({
  providers: [FsrsResolver, FsrsService],
})
export class FsrsModule {}
