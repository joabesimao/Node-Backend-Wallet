import { DbAddStock } from "../../../data/usescases/stock-usecases/add-stock/db-add-stock";
import { StockRepository } from "../../../infra/db/mysql/stock-repository/stock";
import { AddStockController } from "../../../presentation/controllers/stock/add-stock-controller/add-stock-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeAddStockController = (): Controller => {
  const addStockRepository = new StockRepository();
  const addStock = new DbAddStock(addStockRepository);
  const addStockController = new AddStockController(addStock);
  return addStockController;
};
