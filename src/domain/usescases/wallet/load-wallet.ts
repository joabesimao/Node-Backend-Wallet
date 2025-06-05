import { Wallet } from "../../models/wallet-model/wallet";

export interface LoadAllWallet {
  loadAll(): Promise<Wallet[]>;
}

export interface LoadWalletById {
  loadById(id: number): Promise<Wallet>;
}
