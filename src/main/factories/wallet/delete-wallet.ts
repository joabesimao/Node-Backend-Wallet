import { DbDeleteWallet } from "../../../data/usescases/wallet-usecases/delete-wallet/db-delete-wallet";
import { DbLoadOneWallet } from "../../../data/usescases/wallet-usecases/load-one-wallet/db-load-one-wallet";
import { WalletRepository } from "../../../infra/db/mysql/wallet-repository/wallet";
import { DeleteWalletController } from "../../../presentation/controllers/wallet/delete-wallet-controller/delete-wallet-controlller";
import { LoadOneWalletController } from "../../../presentation/controllers/wallet/load-one-wallet-controller/load-one-wallet-controller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeDeleteWalletController = (): Controller => {
  const deleteWalletRepository = new WalletRepository();
  const deleteOneWallet = new DbDeleteWallet(deleteWalletRepository);
  const deleteWalletController = new DeleteWalletController(deleteOneWallet);
  return deleteWalletController;
};
