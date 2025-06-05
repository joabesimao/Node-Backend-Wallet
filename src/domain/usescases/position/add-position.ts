import { Position, PositionModel } from "../../models/position-model/position";

export interface AddPositionModel {
  position: PositionModel;
}

export interface AddPosition {
  add(position: AddPositionModel): Promise<Position>;
}
