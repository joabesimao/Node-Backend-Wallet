import { DbUpdateWallet } from "./db-update-wallet";
import { UpdateWalletRepository } from "../../../protocols/db/wallet/update-wallet";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";

interface SutTypes {
  sut: DbUpdateWallet;
  walletRepositoryStub: UpdateWalletRepository;
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

const makeUpdateWalletRepository = (): UpdateWalletRepository => {
  class WalletRepositoryStub implements UpdateWalletRepository {
    update(id: number, info: Partial<Wallet>): Promise<Wallet> {
      return new Promise((resolve) => resolve(makeWallet()));
    }
  }
  return new WalletRepositoryStub();
};

const makeSut = (): SutTypes => {
  const walletRepositoryStub = makeUpdateWalletRepository();
  const sut = new DbUpdateWallet(walletRepositoryStub);
  return {
    sut,
    walletRepositoryStub,
  };
};

describe("DbUpdatewallet Usecase", () => {
  const id = 1;
  test("Should call UPdatewalletRepository with correct values", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(walletRepositoryStub, "update");
    await sut.update(id, makeWallet());
    expect(addSpy).toHaveBeenCalledWith(1, makeWallet());
  });

  test("Should load one Wallet on success", async () => {
    const { sut } = makeSut();
    const client = await sut.update(id, makeWallet());
    expect(client).toEqual(makeWallet());
  });

  test("Should throw if LoadOneWalletRepository throws", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    jest
      .spyOn(walletRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.update(id, makeWallet());
    await expect(promise).rejects.toThrow();
  });
});
