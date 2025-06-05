import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { UpdateWallet } from "../../../../domain/usescases/wallet/update-wallet";
import { UpdateWalletRepository } from "../../../protocols/db/wallet/update-wallet";

export class DbUpdateWallet implements UpdateWallet {
  constructor(
    private readonly updateWalletRepository: UpdateWalletRepository
  ) {}
  async update(id: number, info: Partial<Wallet>): Promise<Wallet> {
    const updatedWallet = await this.updateWalletRepository.update(id, info);
    return updatedWallet;
  }
}
