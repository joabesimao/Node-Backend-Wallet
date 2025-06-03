import { Wallet } from "../../../../domain/models/wallet-model/wallet";

export interface LoadAllWalletRepository {
  loadAll(): Promise<Wallet[]>;
}
