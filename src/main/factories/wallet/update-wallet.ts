import { DbUpdateWallet } from "../../../data/usescases/wallet-usecases/update-wallet/db-update-wallet";
import { WalletRepository } from "../../../infra/db/mysql/wallet-repository/wallet";
import { UpdateWalletController } from "../../../presentation/controllers/wallet/update-wallet-controller/update-wallet-controlller";
import { Controller } from "../../../presentation/protocols/controller/controller";

export const makeUpdateWalletController = (): Controller => {
  const updateWalletRepository = new WalletRepository();
  const updateWallet = new DbUpdateWallet(updateWalletRepository);
  const updateWalletController = new UpdateWalletController(updateWallet);
  return updateWalletController;
};
