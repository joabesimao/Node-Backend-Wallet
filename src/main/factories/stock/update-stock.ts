import { DbUpdateStock } from "../../../data/usescases/stock-usecases/update-stock/db-update-stock";
import { StockRepository } from "../../../infra/db/mysql/stock-repository/stock";
import { UpdateStockController } from "../../../presentation/controllers/stock/update-stock-controller/update-stock-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeUpdateStockController = (): Controller => {
  const updateStockRepository = new StockRepository();
  const updateStock = new DbUpdateStock(updateStockRepository);
  const updateStockController = new UpdateStockController(updateStock);
  return updateStockController;
};
