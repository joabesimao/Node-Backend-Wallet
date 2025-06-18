import { Stock } from "../../../../domain/models/stock-model/stock";
import { LoadAllStock } from "../../../../domain/usescases/stock/load-stock";
import { LoadAllStockRepository } from "../../../protocols/db/stock/load-all-stock";

export class DbLoadAllStock implements LoadAllStock {
  constructor(
    private readonly loadAllStockRepository: LoadAllStockRepository
  ) {}
  async loadAll(): Promise<Stock[]> {
    const loadStockList = await this.loadAllStockRepository.loadAll();
    return loadStockList;
  }
}
