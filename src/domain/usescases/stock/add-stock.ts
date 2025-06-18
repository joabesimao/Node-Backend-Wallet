import { Stock } from "../../models/stock-model/stock";

export interface AddStockModel {
  name: string;
}

export interface AddStock {
  add(stock: AddStockModel): Promise<Stock>;
}
