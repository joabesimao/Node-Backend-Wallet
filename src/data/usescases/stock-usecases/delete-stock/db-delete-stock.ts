import { DeleteStock } from "../../../../domain/usescases/stock/delete-stock";
import { DeleteStockRepository } from "../../../protocols/db/stock/delete-stock";

export class DbDeleteStock implements DeleteStock {
  constructor(private readonly deleteStockRepository: DeleteStockRepository) {}
  async delete(id: number): Promise<string> {
    const deleteStock = await this.deleteStockRepository.delete(id);
    return deleteStock;
  }
}
