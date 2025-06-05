import { DbLoadOneWallet } from "./db-load-one-wallet";
import { LoadOneWalletRepository } from "../../../protocols/db/wallet/load-one-wallet";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";

interface SutTypes {
  sut: DbLoadOneWallet;
  walletRepositoryStub: LoadOneWalletRepository;
}

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

const makeLoadOneWalletRepository = (): LoadOneWalletRepository => {
  class WalletRepositoryStub implements LoadOneWalletRepository {
    async loadOne(id: number): Promise<Wallet> {
      return new Promise((resolve) => resolve(makeWallet()));
    }
  }
  return new WalletRepositoryStub();
};

const makeSut = (): SutTypes => {
  const walletRepositoryStub = makeLoadOneWalletRepository();
  const sut = new DbLoadOneWallet(walletRepositoryStub);
  return {
    sut,
    walletRepositoryStub,
  };
};

describe("DbLoadOnewallet Usecase", () => {
  const id = 1;
  test("Should call LoadOnewalletRepository with correct values", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(walletRepositoryStub, "loadOne");
    await sut.loadById(id);
    expect(addSpy).toHaveBeenCalledWith(1);
  });

  test("Should load one Wallet on success", async () => {
    const { sut } = makeSut();
    const client = await sut.loadById(id);
    expect(client).toEqual(makeWallet());
  });

  test("Should throw if LoadOneWalletRepository throws", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    jest
      .spyOn(walletRepositoryStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.loadById(id);
    await expect(promise).rejects.toThrow();
  });
});
