import { DbDeleteStock } from "../../../data/usescases/stock-usecases/delete-stock/db-delete-stock";
import { StockRepository } from "../../../infra/db/mysql/stock-repository/stock";
import { DeleteStockController } from "../../../presentation/controllers/stock/delete-stock-controller/delete-stock-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeDeleteStockController = (): Controller => {
  const deleteStockRepository = new StockRepository();
  const deleteStock = new DbDeleteStock(deleteStockRepository);
  const deleteStockController = new DeleteStockController(deleteStock);
  return deleteStockController;
};
