import { Wallet } from "../../models/wallet-model/wallet";

export interface UpdateWallet {
  update(id: number, info: Partial<Wallet>): Promise<Wallet>;
}
