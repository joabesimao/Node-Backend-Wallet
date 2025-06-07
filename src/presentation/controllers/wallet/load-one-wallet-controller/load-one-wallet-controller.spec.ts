import { LoadOneWalletController } from "./load-one-wallet-controller";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { LoadWalletById } from "../../../../domain/usescases/wallet/load-wallet";
import { HttpRequest } from "../../../protocols/http/http";

const makeFakeWallet = (): Wallet => ({
  positions: [
    {
      id: 5,
      quantity: 1,
      stock: {
        id: 1,
        name: "any_name",
        valueStock: 10,
      },
    },
  ],
});

const fakeHttpRequest = (): HttpRequest => ({
  body: {},
  params: {
    id: 5,
  },
});

interface SutTypes {
  sut: LoadOneWalletController;
  loadOneWalletStub: LoadWalletById;
}
const makeLoadOneWalletStub = (): LoadWalletById => {
  class LoadOneWalletStub implements LoadWalletById {
    async loadById(id: number): Promise<Wallet> {
      return new Promise((resolve) => resolve(makeFakeWallet()));
    }
  }
  return new LoadOneWalletStub();
};

const makeSut = (): SutTypes => {
  const loadOneWalletStub = makeLoadOneWalletStub();
  const sut = new LoadOneWalletController(loadOneWalletStub);
  return {
    sut,
    loadOneWalletStub,
  };
};

describe("LoadOneWallet Controller", () => {
  const id = 5;

  test("Should call LoadOneWallet with correct values", async () => {
    const { sut, loadOneWalletStub } = makeSut();
    const loadOneSpy = jest.spyOn(loadOneWalletStub, "loadById");
    await sut.handle(fakeHttpRequest());
    expect(loadOneSpy).toHaveBeenCalledWith(id);
  });

  test("Should return 500 if LoadOneWallet throws", async () => {
    const { sut, loadOneWalletStub } = makeSut();
    jest
      .spyOn(loadOneWalletStub, "loadById")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );

    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return one Wallet and return status 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(ok(makeFakeWallet()));
  });
});
