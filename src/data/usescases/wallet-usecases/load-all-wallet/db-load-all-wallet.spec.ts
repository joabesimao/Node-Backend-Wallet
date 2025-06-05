import { DbLoadAllWallet } from "./db-load-all-wallet";
import { LoadAllWalletRepository } from "../../../protocols/db/wallet/load-all-wallet";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";

interface SutTypes {
  sut: DbLoadAllWallet;
  walletRepositoryStub: LoadAllWalletRepository;
}

const makeLoadWallet = (): Wallet[] => [
  {
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
];

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

const makeLoadWalletRepository = (): LoadAllWalletRepository => {
  class WalletRepositoryStub implements LoadAllWalletRepository {
    async loadAll(): Promise<Wallet[]> {
      return new Promise((resolve) => resolve(makeLoadWallet()));
    }
  }
  return new WalletRepositoryStub();
};

const makeSut = (): SutTypes => {
  const walletRepositoryStub = makeLoadWalletRepository();
  const sut = new DbLoadAllWallet(walletRepositoryStub);
  return {
    sut,
    walletRepositoryStub,
  };
};

describe("DbLoadAllwallet Usecase", () => {
  test("Should call LoadAllwalletRepository with correct values", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(walletRepositoryStub, "loadAll");
    await sut.loadAll();
    expect(addSpy).toHaveBeenCalled();
  });

  test("Should load a  list of Wallet on success", async () => {
    const { sut } = makeSut();
    const client = await sut.loadAll();
    expect(client).toEqual([
      {
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
    ]);
  });

  test("Should throw if LoadWalletRepository throws", async () => {
    const { sut, walletRepositoryStub } = makeSut();
    jest
      .spyOn(walletRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow();
  });
});
