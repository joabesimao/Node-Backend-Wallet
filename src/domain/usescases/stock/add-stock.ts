import { Stock } from "../../models/stock-model/stock";

export interface AddStockModel {
  stock: Stock;
}

export interface AddStock {
  add(stock: AddStockModel): Promise<Stock>;
}
