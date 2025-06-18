import { DbLoadAllStock } from "../../../data/usescases/stock-usecases/load-all-stock/db-load-all-stock";
import { StockRepository } from "../../../infra/db/mysql/stock-repository/stock";
import { LoadAllStockController } from "../../../presentation/controllers/stock/load-all-stock-controller/load-all-stock-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeLoadAllStockController = (): Controller => {
  const loadStockRepository = new StockRepository();
  const loadStock = new DbLoadAllStock(loadStockRepository);
  const loadStockController = new LoadAllStockController(loadStock);
  return loadStockController;
};
