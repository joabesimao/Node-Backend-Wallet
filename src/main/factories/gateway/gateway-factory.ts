import { GetStockPriceService } from "../../../data/usescases/gateway/gateway-usecase";
import { marketStackApi } from "../../../infra/gateway-adapter/adapter-api";
import { StockController } from "../../../presentation/controllers/api-gateway/api-gateway-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeLoadStocksController = (): Controller => {
  const marketStock = new marketStackApi();
  const stockService = new GetStockPriceService(marketStock);
  const stockController = new StockController(stockService);
  return stockController;
};
