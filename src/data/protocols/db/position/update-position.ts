import { Position } from "../../../../domain/models/position-model/position";

export interface UpdatePositionRepository {
  update(id: number, info: Partial<Position>): Promise<Position>;
}
