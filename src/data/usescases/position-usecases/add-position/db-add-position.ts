import { Position } from "../../../../domain/models/position-model/position";
import {
  AddPosition,
  AddPositionModel,
} from "../../../../domain/usescases/position/add-position";
import { AddPositionRepository } from "../../../protocols/db/position/add-position";

export class DbAddPosition implements AddPosition {
  constructor(private readonly addPositionRepository: AddPositionRepository) {}
  async add(position: AddPositionModel): Promise<Position> {
    const addPosition = await this.addPositionRepository.add(position);
    return addPosition;
  }
}
