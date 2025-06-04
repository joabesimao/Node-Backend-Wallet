import { Position } from "../../../../domain/models/position-model/position";
import { UpdatePosition } from "../../../../domain/usescases/position/update-position";
import { UpdatePositionRepository } from "../../../protocols/db/position/update-position";

export class DbUpdatePosition implements UpdatePosition {
  constructor(
    private readonly updatePositionRepository: UpdatePositionRepository
  ) {}
  async update(id: number, info: Partial<Position>): Promise<Position> {
    const updatedPosition = await this.updatePositionRepository.update(
      id,
      info
    );
    return updatedPosition;
  }
}
