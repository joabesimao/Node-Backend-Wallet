import { Stock } from "../stock-model/stock";

export interface PositionModel {
  stock: Stock;
  quantity: number;
}

export interface Position {
  id: number;
  stock: Stock;
  quantity: number;
}
