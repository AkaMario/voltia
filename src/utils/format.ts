import { fmt } from "../domain/data";

export const percent = (value: number | null) =>
  value === null ? "N/D" : `${fmt(value, 1)}%`;
