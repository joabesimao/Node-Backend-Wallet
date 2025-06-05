import { Wallet } from "../../../../domain/models/wallet-model/wallet";

export interface LoadOneWalletRepository {
  loadOne(id: number): Promise<Wallet>;
}
