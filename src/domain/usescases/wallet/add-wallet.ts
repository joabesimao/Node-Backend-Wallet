import { Position } from "../../models/position-model/position";
import { Wallet } from "../../models/wallet-model/wallet";

export interface AddWalletModel {
  positions: Position[];
}

export interface AddWallet {
  add(wallet: AddWalletModel): Promise<Wallet>;
}
