import { Stock } from "../../../../domain/models/stock-model/stock";
import {
  AddStock,
  AddStockModel,
} from "../../../../domain/usescases/stock/add-stock";
import { AddStockRepository } from "../../../protocols/db/stock/add-stock";

export class DbAddStock implements AddStock {
  constructor(private readonly addStockRepository: AddStockRepository) {}
  async add(stock: AddStockModel): Promise<Stock> {
    const addStock = await this.addStockRepository.add(stock);
    return addStock;
  }
}
