import { Position } from "../../../../domain/models/position-model/position";

export interface LoadOnePositionRepository {
  loadOne(id: number): Promise<Position>;
}
