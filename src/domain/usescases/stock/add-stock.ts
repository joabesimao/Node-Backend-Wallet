import { Stock, StockModel } from "../../models/stock-model/stock";

export interface AddStockModel {
  name: string;
  valueStock: number;
}

export interface AddStock {
  add(stock: AddStockModel): Promise<Stock>;
}
