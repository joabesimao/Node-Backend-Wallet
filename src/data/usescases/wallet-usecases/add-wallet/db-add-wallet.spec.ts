import { DbAddWallet } from "./db-add-wallet";
import { AddWalletRepository } from "../../../protocols/db/wallet/add-wallet";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { AddWalletModel } from "../../../../domain/usescases/wallet/add-wallet";

interface SutTypes {
  sut: DbAddWallet;
  walletRepositoryStub: AddWalletRepository;
}

const makeAddWallet = (): AddWalletModel => ({
  wallet: {
    positions: [
      {
        id: 1,
        quantity: 1,
        stock: {
          id: 1,
          name: "any_name",
          valueStock: 10,
        },
      },
      {
        id: 2,
        quantity: 2,
        stock: {
          id: 2,
          name: "other_name",
          valueStock: 20,
        },
      },
    ],
  },
});

const makeWallet = (): Wallet => ({
  positions: [
    {
      id: 2,
      quantity: 2,
      stock: {
        id: 2,
        name: "other_name",
        valueStock: 20,
      },
    },
  ],
});

const makeWalletRepository = (): AddWalletRepository => {
  class WalletRepositoryStub implements AddWalletRepository {
    async add(wallet: AddWalletModel): Promise<Wallet> {
      return new Promise((resolve) => resolve(makeWallet()));
    }
  }
  return new WalletRepositoryStub();
};

const makeSut = (): SutTypes => {
  const walletRepositoryStub = makeWalletRepository();
  const sut = new DbAddWallet(walletRepositoryStub);
  return {
    sut,
    walletRepositoryStub,
  };
};

describe("DbAddwallet Usecase", () => {
  test("Should call AddwalletRepository with correct values", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(walletRepositoryStub, "add");
    await sut.add(makeAddWallet());
    expect(addSpy).toHaveBeenCalledWith(makeAddWallet());
  });

  test("Should add a Wallet on success", async () => {
    const { sut } = makeSut();
    const client = await sut.add(makeAddWallet());
    expect(client).toEqual(makeWallet());
  });

  test("Should throw if addWalletRepository throws", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    jest
      .spyOn(walletRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.add(makeAddWallet());
    await expect(promise).rejects.toThrow();
  });
});
