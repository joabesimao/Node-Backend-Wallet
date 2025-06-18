import { Stock } from "../../models/stock-model/stock";

export interface UpdateStock {
  update(id: number, info: Partial<Stock>): Promise<Stock>;
}
