import { Position } from "../../../../domain/models/position-model/position";
import { AddPositionModel } from "../../../../domain/usescases/position/add-position";

export interface AddPositionRepository {
  add(position: AddPositionModel): Promise<Position>;
}
