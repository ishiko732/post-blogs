import { GraphQLErrorFilter } from '@/filters/custom-exception.filter';
import { UseFilters } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';

@UseFilters(GraphQLErrorFilter)
@Resolver()
export class AuthResolver {}
