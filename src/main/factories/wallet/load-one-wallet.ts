import { DbLoadOneWallet } from "../../../data/usescases/wallet-usecases/load-one-wallet/db-load-one-wallet";
import { WalletRepository } from "../../../infra/db/mysql/wallet-repository/wallet";
import { LoadOneWalletController } from "../../../presentation/controllers/wallet/load-one-wallet-controller/load-one-wallet-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeLoadOneWalletController = (): Controller => {
  const loadOneWalletRepository = new WalletRepository();
  const loadOneWallet = new DbLoadOneWallet(loadOneWalletRepository);
  const loadOneWalletController = new LoadOneWalletController(loadOneWallet);
  return loadOneWalletController;
};
