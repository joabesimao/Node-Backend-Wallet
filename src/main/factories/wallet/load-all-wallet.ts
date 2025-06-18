import { DbLoadAllWallet } from "../../../data/usescases/wallet-usecases/load-all-wallet/db-load-all-wallet";
import { WalletRepository } from "../../../infra/db/mysql/wallet-repository/wallet";
import { LoadAllWalletController } from "../../../presentation/controllers/wallet/load-all-wallet-controller/load-all-wallet-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeLoadAllWalletController = (): Controller => {
  const loadAllWalletRepository = new WalletRepository();
  const loadAllWallet = new DbLoadAllWallet(loadAllWalletRepository);
  const loadAllWalletController = new LoadAllWalletController(loadAllWallet);
  return loadAllWalletController;
};
