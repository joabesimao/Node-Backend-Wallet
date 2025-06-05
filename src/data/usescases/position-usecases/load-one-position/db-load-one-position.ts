import { Position } from "../../../../domain/models/position-model/position";
import { LoadPositionById } from "../../../../domain/usescases/position/load-position";
import { LoadOnePositionRepository } from "../../../protocols/db/position/load-one-position";

export class DbLoadOnePosition implements LoadPositionById {
  constructor(
    private readonly loadOnePositionRepository: LoadOnePositionRepository
  ) {}

  async loadById(id: number): Promise<Position> {
    const findPosition = await this.loadOnePositionRepository.loadOne(id);
    return findPosition;
  }
}
