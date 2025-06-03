import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { AddWalletModel } from "../../../../domain/usescases/wallet/add-wallet";

export interface AddWalletRepository {
  add(wallet: AddWalletModel): Promise<Wallet>;
}
