import type { Filter } from './types'

export interface RouteQuery {
  filter?: Filter;
  search?: string;
  [key: string]: any;
}