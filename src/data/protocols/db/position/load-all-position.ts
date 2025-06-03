import { Position } from "../../../../domain/models/position-model/position";

export interface LoadAllPositionRepository {
  loadAll(): Promise<Position[]>;
}
