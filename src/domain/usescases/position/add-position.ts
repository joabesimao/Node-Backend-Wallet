import { Position } from "../../models/position-model/position";

export interface AddPositionModel {
  position: Position;
}

export interface AddPosition {
  add(position: AddPositionModel): Promise<Position>;
}
