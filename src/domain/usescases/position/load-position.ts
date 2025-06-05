import { Position } from "../../models/position-model/position";

export interface LoadAllPosition {
  loadAll(): Promise<Position[]>;
}

export interface LoadPositionById {
  loadById(id: number): Promise<Position>;
}
