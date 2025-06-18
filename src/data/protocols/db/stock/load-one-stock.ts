import { Stock } from "../../../../domain/models/stock-model/stock";

export interface LoadOneStockRepository {
  loadOne(id: number): Promise<Stock>;
}
