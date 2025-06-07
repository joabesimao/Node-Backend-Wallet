import { LoadAllWalletController } from "./load-all-wallet-controller";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { LoadAllWallet } from "../../../../domain/usescases/wallet/load-wallet";

const makeFakeWalletList = (): Wallet[] => [
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

interface SutTypes {
  sut: LoadAllWalletController;
  loadAllWalletStub: LoadAllWallet;
}
const makeLoadAllWalletStub = (): LoadAllWallet => {
  class LoadAllWalletStub implements LoadAllWallet {
    async loadAll(): Promise<Wallet[]> {
      return new Promise((resolve) => resolve(makeFakeWalletList()));
    }
  }
  return new LoadAllWalletStub();
};

const makeSut = (): SutTypes => {
  const loadAllWalletStub = makeLoadAllWalletStub();
  const sut = new LoadAllWalletController(loadAllWalletStub);
  return {
    sut,
    loadAllWalletStub,
  };
};

describe("LoadAllWallet Controller", () => {
  test("Should call LoadWallet with correct values", async () => {
    const { sut, loadAllWalletStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadAllWalletStub, "loadAll");
    await sut.handle({});
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test("Should return 500 if LoadWallet throws", async () => {
    const { sut, loadAllWalletStub } = makeSut();
    jest
      .spyOn(loadAllWalletStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );

    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return a list of Wallets and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeWalletList()));
  });
});
