import { Wallet } from "../../models/wallet-model/wallet";

export interface AddWalletModel {
  wallet: Wallet;
}

export interface AddWallet {
  add(wallet: AddWalletModel): Promise<Wallet>;
}
