import { DeletePositionById } from "../../../../domain/usescases/position/delete-position";
import { DeletePositionRepository } from "../../../protocols/db/position/delete-position";

export class DbDeletePosition implements DeletePositionById {
  constructor(
    private readonly deletePositionRepository: DeletePositionRepository
  ) {}
  async deleteById(id: number): Promise<string> {
    const deleted = await this.deletePositionRepository.delete(id);
    return deleted;
  }
}
