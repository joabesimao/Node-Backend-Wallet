import { Stock } from "../../../../domain/models/stock-model/stock";
import { UpdateStock } from "../../../../domain/usescases/stock/update-stock";
import { UpdateStockRepository } from "../../../protocols/db/stock/update-stock";

export class DbUpdateStock implements UpdateStock {
  constructor(private readonly updateStockRepository: UpdateStockRepository) {}
  async update(id: number, info: Partial<Stock>): Promise<Stock> {
    const updateStock = await this.updateStockRepository.update(id, info);
    return updateStock;
  }
}
