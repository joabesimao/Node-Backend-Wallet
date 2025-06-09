import { Stock } from "../../../../domain/models/stock-model/stock";
import { AddStockModel } from "../../../../domain/usescases/stock/add-stock";

export interface AddStockRepository {
  add(stock: AddStockModel): Promise<Stock>;
}
