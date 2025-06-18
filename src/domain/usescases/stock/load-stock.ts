import { Stock } from "../../models/stock-model/stock";

export interface LoadAllStock {
  loadAll(): Promise<Stock[]>;
}

export interface LoadOneStock {
  loadOne(id: number): Promise<Stock>;
}
