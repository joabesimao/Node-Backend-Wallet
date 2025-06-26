import { Position } from "../../models/position-model/position";
import { Wallet } from "../../models/wallet-model/wallet";

export interface AddWalletInput {
  quantity: number;
  stockId: number;
}

export interface AddWalletModel {
  positions: AddWalletInput[];
}

export interface AddWallet {
  add(wallet: AddWalletModel): Promise<Wallet>;
}
