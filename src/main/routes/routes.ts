import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddClientController } from "../factories/client/add-client";
import { makeLoadAllClientController } from "../factories/client/load-all-client";
import { makeUpdateClientController } from "../factories/client/update-client";
import { makeDeleteClientController } from "../factories/client/delete-client";
import { makeLoadOneClientController } from "../factories/client/load-one-client";
import { makeLoadAllPositionController } from "../factories/position/load-all-position";
import { makeLoadOnePositionController } from "../factories/position/load-one-position";
import { makeAddPositionController } from "../factories/position/add-position";
import { makeUpdatePositionController } from "../factories/position/update-position";
import { makeDeletePositionController } from "../factories/position/delete-position";
import { makeAddStockController } from "../factories/stock/add-stock";
import { makeLoadAllStockController } from "../factories/stock/load-all-stock";
import { makeLoadOneStockController } from "../factories/stock/load-one-stock";
import { makeUpdateStockController } from "../factories/stock/update-stock";
import { makeDeleteStockController } from "../factories/stock/delete-stock";
import { makeLoadAllWalletController } from "../factories/wallet/load-all-wallet";
import { makeLoadOneWalletController } from "../factories/wallet/load-one-wallet";
import { makeAddWalletController } from "../factories/wallet/add-wallet";
import { makeUpdateWalletController } from "../factories/wallet/update-wallet";
import { makeDeleteWalletController } from "../factories/wallet/delete-wallet";
import axios from "axios";
import { makeLoadStocksController } from "../factories/gateway/gateway-factory";

export default (router: Router): void => {
  router.get("/client", adaptRoute(makeLoadAllClientController()));
  router.get("/client/:id", adaptRoute(makeLoadOneClientController()));
  router.post("/client", adaptRoute(makeAddClientController()));
  router.put("/client/:id", adaptRoute(makeUpdateClientController()));
  router.delete("/client/:id", adaptRoute(makeDeleteClientController()));

  router.get("/position", adaptRoute(makeLoadAllPositionController()));
  router.get("/position/:id", adaptRoute(makeLoadOnePositionController()));
  router.post("/position", adaptRoute(makeAddPositionController()));
  router.put("/position/:id", adaptRoute(makeUpdatePositionController()));
  router.delete("/position/:id", adaptRoute(makeDeletePositionController()));

  router.get("/stock", adaptRoute(makeLoadAllStockController()));
  router.get("/stock/:id", adaptRoute(makeLoadOneStockController()));
  router.post("/stock", adaptRoute(makeAddStockController()));
  router.put("/stock/:id", adaptRoute(makeUpdateStockController()));
  router.delete("/stock/:id", adaptRoute(makeDeleteStockController()));

  router.get("/wallet", adaptRoute(makeLoadAllWalletController()));
  router.get("/wallet/:id", adaptRoute(makeLoadOneWalletController()));
  router.post("/wallet", adaptRoute(makeAddWalletController()));
  router.put("/wallet/:id", adaptRoute(makeUpdateWalletController()));
  router.delete("/wallet/:id", adaptRoute(makeDeleteWalletController()));

  router.get("/lista/:symbol", adaptRoute(makeLoadStocksController()));
};
