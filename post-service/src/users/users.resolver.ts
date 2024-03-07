import { Resolver } from '@nestjs/graphql';
import { GraphQLErrorFilter } from '@/filters/custom-exception.filter';
import { UseFilters } from '@nestjs/common';

@UseFilters(GraphQLErrorFilter)
@Resolver()
export class UsersResolver {}
