import { DeleteWalletRepository } from "../../../protocols/db/wallet/delete-wallet";
import { DeleteById } from "../../../../domain/usescases/wallet/delete-wallet";

export class DbDeleteWallet implements DeleteById {
  constructor(
    private readonly deleteWalletRepository: DeleteWalletRepository
  ) {}

  async deleteById(id: number): Promise<string> {
    const deleteWallet = await this.deleteWalletRepository.delete(id);
    return deleteWallet;
  }
}
