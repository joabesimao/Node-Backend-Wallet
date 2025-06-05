import { DbDeleteWallet } from "./db-delete-wallet";
import { DeleteWalletRepository } from "../../../protocols/db/wallet/delete-wallet";

interface SutTypes {
  sut: DbDeleteWallet;
  walletRepositoryStub: DeleteWalletRepository;
}

const makeDeleteWalletRepository = (): DeleteWalletRepository => {
  class WalletRepositoryStub implements DeleteWalletRepository {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Wallet Deletada com Successo!"));
    }
  }
  return new WalletRepositoryStub();
};

const makeSut = (): SutTypes => {
  const walletRepositoryStub = makeDeleteWalletRepository();
  const sut = new DbDeleteWallet(walletRepositoryStub);
  return {
    sut,
    walletRepositoryStub,
  };
};

describe("DbDeletewallet Usecase", () => {
  const id = 7;
  test("Should call DeleteWalletRepository with correct values", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(walletRepositoryStub, "delete");
    await sut.deleteById(id);
    expect(addSpy).toHaveBeenCalledWith(7);
  });

  test("Should delete Wallet on success", async () => {
    const { sut } = makeSut();
    const client = await sut.deleteById(id);
    expect(client).toEqual("Wallet Deletada com Successo!");
  });

  test("Should throw if DeleteWalletRepository throws", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    jest
      .spyOn(walletRepositoryStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.deleteById(id);
    await expect(promise).rejects.toThrow();
  });
});
