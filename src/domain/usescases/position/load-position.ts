import { Position } from "../../models/position-model/position";

export interface LoadPosition {
  load(): Promise<Position[]>;
}
