import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FsrsService } from './fsrs.service';
import { Fsr } from './entities/fsr.entity';
import { CreateFsrInput } from './dto/create-fsr.input';
import { UpdateFsrInput } from './dto/update-fsr.input';
import { GraphQLErrorFilter } from '@/filters/custom-exception.filter';
import { UseFilters } from '@nestjs/common';

@UseFilters(GraphQLErrorFilter)
@Resolver(() => Fsr)
export class FsrsResolver {
  constructor(private readonly fsrsService: FsrsService) {}

  @Mutation(() => Fsr)
  createFsr(@Args('createFsrInput') createFsrInput: CreateFsrInput) {
    return this.fsrsService.create(createFsrInput);
  }

  @Query(() => [Fsr], { name: 'fsrs' })
  findAll() {
    return this.fsrsService.findAll();
  }

  @Query(() => Fsr, { name: 'fsr' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fsrsService.findOne(id);
  }

  @Mutation(() => Fsr)
  updateFsr(@Args('updateFsrInput') updateFsrInput: UpdateFsrInput) {
    return this.fsrsService.update(updateFsrInput.id, updateFsrInput);
  }

  @Mutation(() => Fsr)
  removeFsr(@Args('id', { type: () => Int }) id: number) {
    return this.fsrsService.remove(id);
  }
}
