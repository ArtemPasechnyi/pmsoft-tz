import { Dispatch, SetStateAction } from "react";

export interface ISelectedBooks {
  setSelectedBooks: Dispatch<SetStateAction<number[]>>;
  selectedBooks: number[];
}
