import { Stock } from "../../../../domain/models/stock-model/stock";
import { LoadOneStock } from "../../../../domain/usescases/stock/load-stock";
import { LoadOneStockRepository } from "../../../protocols/db/stock/load-one-stock";

export class DbLoadOneStock implements LoadOneStock {
  constructor(
    private readonly loadOneStockRepository: LoadOneStockRepository
  ) {}
  async loadOne(id: number): Promise<Stock> {
    const oneStock = await this.loadOneStockRepository.loadOne(id);
    return oneStock;
  }
}
