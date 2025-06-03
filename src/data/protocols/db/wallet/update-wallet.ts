import { Wallet } from "../../../../domain/models/wallet-model/wallet";

export interface UpdateWalletRepository {
  update(id: number, info: Partial<Wallet>): Promise<Wallet>;
}
