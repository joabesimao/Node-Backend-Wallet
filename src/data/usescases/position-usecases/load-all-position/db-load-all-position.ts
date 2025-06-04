import { Position } from "../../../../domain/models/position-model/position";
import { LoadAllPosition } from "../../../../domain/usescases/position/load-position";
import { LoadAllPositionRepository } from "../../../protocols/db/position/load-all-position";

export class DbLoadAllPositions implements LoadAllPosition {
  constructor(private readonly loadAllPositons: LoadAllPositionRepository) {}
  async loadAll(): Promise<Position[]> {
    const loadAllPositionsList = await this.loadAllPositons.loadAll();
    return loadAllPositionsList;
  }
}
