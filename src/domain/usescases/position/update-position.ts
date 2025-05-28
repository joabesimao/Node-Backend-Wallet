import { Position } from "../../models/position-model/position";

export interface UpdatePosition {
  update(id: number, info: Partial<Position>): Promise<Position>;
}
