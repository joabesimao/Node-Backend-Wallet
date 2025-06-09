import { Stock, StockModel } from "../../models/stock-model/stock";

export interface AddStockModel {
  stock: StockModel;
}

export interface AddStock {
  add(stock: AddStockModel): Promise<Stock>;
}
