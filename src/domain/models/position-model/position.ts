import { Stock } from "../stock-model/stock";

export interface Position {
  stock: Stock;
  quantity: number;
}
