import { UpdateClientRepository } from "../../../../data/protocols/db/client/update-client";
import { AddWalletRepository } from "../../../../data/protocols/db/wallet/add-wallet";
import { DeleteWalletRepository } from "../../../../data/protocols/db/wallet/delete-wallet";
import { LoadAllWalletRepository } from "../../../../data/protocols/db/wallet/load-all-wallet";
import { LoadOneWalletRepository } from "../../../../data/protocols/db/wallet/load-one-wallet";
import { UpdateWalletRepository } from "../../../../data/protocols/db/wallet/update-wallet";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { AddWalletModel } from "../../../../domain/usescases/wallet/add-wallet";
import { DeleteWalletById } from "../../../../domain/usescases/wallet/delete-wallet";
import { prisma } from "../helper";

export class WalletRepository
  implements
    AddWalletRepository,
    LoadAllWalletRepository,
    LoadOneWalletRepository,
    UpdateWalletRepository,
    DeleteWalletRepository
{
  async add(wallet: AddWalletModel): Promise<Wallet> {
    const addWallet = await prisma.wallet.create({
      data: wallet,
    });
    return addWallet as any;
  }

  async loadAll(): Promise<Wallet[]> {
    const loadAllWallet = await prisma.wallet.findMany({});
    return loadAllWallet as unknown as Wallet[];
  }

  async loadOne(id: number): Promise<Wallet> {
    const loadOne = await prisma.wallet.findUnique({
      where: {
        id: Number(id),
      },
    });
    return loadOne as unknown as Wallet;
  }

  async update(id: number, info: Partial<Wallet>): Promise<Wallet> {
    const updateWallet = await prisma.wallet.update({
      where: {
        id: Number(id),
      },
      data: {
        ...info,
      },
    });
    return updateWallet as unknown as Wallet;
  }

  async delete(id: number): Promise<string> {
    const deleteWallet = await prisma.wallet.delete({
      where: {
        id: Number(id),
      },
    });
    return deleteWallet as unknown as string;
  }
}
