import { Stock } from "../../../../domain/models/stock-model/stock";

export interface UpdateStockRepository {
  update(id: number, info: Partial<Stock>): Promise<Stock>;
}
