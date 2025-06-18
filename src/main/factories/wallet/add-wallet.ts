import { DbAddWallet } from "../../../data/usescases/wallet-usecases/add-wallet/db-add-wallet";
import { WalletRepository } from "../../../infra/db/mysql/wallet-repository/wallet";
import { AddWalletController } from "../../../presentation/controllers/wallet/add-wallet-controller/add-wallet-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeAddWalletController = (): Controller => {
  const addWalletRepository = new WalletRepository();
  const addWallet = new DbAddWallet(addWalletRepository);
  const addWalletController = new AddWalletController(addWallet);
  return addWalletController;
};
