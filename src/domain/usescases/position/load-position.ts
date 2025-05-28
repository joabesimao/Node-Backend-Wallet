import { Position } from "../../models/position-model/position";

export interface LoadPosition {
  load(): Promise<Position[]>;
}

export interface LoadPositionById{
  loadById(id:number):Promise<Position>
}
