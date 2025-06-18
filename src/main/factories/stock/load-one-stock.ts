import { DbLoadOneStock } from "../../../data/usescases/stock-usecases/load-one-stock/db-load-one-stock";
import { StockRepository } from "../../../infra/db/mysql/stock-repository/stock";
import { LoadOneStockController } from "../../../presentation/controllers/stock/load-one-stock-controller/load-one-stock-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeLoadOneStockController = (): Controller => {
  const loadOneStockRepository = new StockRepository();
  const loadOneStock = new DbLoadOneStock(loadOneStockRepository);
  const loadOneStockController = new LoadOneStockController(loadOneStock);
  return loadOneStockController;
};
