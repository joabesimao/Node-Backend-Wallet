import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import {
  AddWallet,
  AddWalletModel,
} from "../../../../domain/usescases/wallet/add-wallet";
import { AddWalletRepository } from "../../../protocols/db/wallet/add-wallet";

export class DbAddWallet implements AddWallet {
  constructor(private readonly addWalletRepository: AddWalletRepository) {}

  async add(wallet: AddWalletModel): Promise<Wallet> {
    const walletAdd = await this.addWalletRepository.add(wallet);
    return walletAdd;
  }
}
