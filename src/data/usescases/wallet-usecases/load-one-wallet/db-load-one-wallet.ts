import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { LoadWalletById } from "../../../../domain/usescases/wallet/load-wallet";
import { LoadOneWalletRepository } from "../../../protocols/db/wallet/load-one-wallet";

export class DbLoadOneWallet implements LoadWalletById {
  constructor(
    private readonly LoadOneWalletRepository: LoadOneWalletRepository
  ) {}
  async loadById(id: number): Promise<Wallet> {
    const loadOneWallet = await this.LoadOneWalletRepository.loadOne(id);
    return loadOneWallet;
  }
}
