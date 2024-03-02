import { ETypeOfBook } from "./emuns";

export interface IBook {
  id: number;
  name: string;
  types: ETypeOfBook[];
  author: string;
  year: number | string;
  rating: number | string;
}
