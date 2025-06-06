import { DeleteWalletRepository } from "../../../protocols/db/wallet/delete-wallet";
import { DeleteWalletById } from "../../../../domain/usescases/wallet/delete-wallet";

export class DbDeleteWallet implements DeleteWalletById {
  constructor(
    private readonly deleteWalletRepository: DeleteWalletRepository
  ) {}

  async deleteById(id: number): Promise<string> {
    const deleteWallet = await this.deleteWalletRepository.delete(id);
    return deleteWallet;
  }
}
