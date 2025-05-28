import { Wallet } from "../../models/wallet-model/wallet";

export interface LoadWallet {
  load(): Promise<Wallet[]>;
}
