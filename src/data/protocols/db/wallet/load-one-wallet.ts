import { Wallet } from "../../../../domain/models/wallet-model/wallet";

export interface LoadOneWalletRepository {
  loadOne(): Promise<Wallet>;
}
