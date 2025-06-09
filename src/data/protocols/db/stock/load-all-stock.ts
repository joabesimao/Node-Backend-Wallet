import { Stock } from "../../../../domain/models/stock-model/stock";

export interface LoadAllStockRepository {
  loadAll(): Promise<Stock[]>;
}
