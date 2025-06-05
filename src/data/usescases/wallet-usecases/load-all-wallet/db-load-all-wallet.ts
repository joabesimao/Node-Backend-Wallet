import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { LoadAllWallet } from "../../../../domain/usescases/wallet/load-wallet";
import { LoadAllWalletRepository } from "../../../protocols/db/wallet/load-all-wallet";

export class DbLoadAllWallet implements LoadAllWallet {
  constructor(
    private readonly loadAllWalletRepository: LoadAllWalletRepository
  ) {}

  async loadAll(): Promise<Wallet[]> {
    const walletList = await this.loadAllWalletRepository.loadAll();
    return walletList;
  }
}
