import { Position, PositionModel } from "../../models/position-model/position";
import { Stock } from "../../models/stock-model/stock";

export interface AddPositionModel {
  stock: Stock;
  quantity: number;
}

export interface AddPosition {
  add(position: AddPositionModel): Promise<Position>;
}
