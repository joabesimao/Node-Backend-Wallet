import { UpdateWalletController } from "./update-wallet-controlller";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import { UpdateWallet } from "../../../../domain/usescases/wallet/update-wallet";
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
  body: makeFakeWallet(),
  params: {
    id: 5,
  },
});

interface SutTypes {
  sut: UpdateWalletController;
  updateWalletStub: UpdateWallet;
}
const makeUpdateWalletStub = (): UpdateWallet => {
  class UpdateWalletStub implements UpdateWallet {
    async update(id: number, info: Partial<Wallet>): Promise<Wallet> {
      return new Promise((resolve) => resolve(makeFakeWallet()));
    }
  }
  return new UpdateWalletStub();
};

const makeSut = (): SutTypes => {
  const updateWalletStub = makeUpdateWalletStub();
  const sut = new UpdateWalletController(updateWalletStub);
  return {
    sut,
    updateWalletStub,
  };
};

describe("UpdateWallet Controller", () => {
  const id = 5;

  test("Should call UpdateWallet with correct values", async () => {
    const { sut, updateWalletStub } = makeSut();
    const loadAllSpy = jest.spyOn(updateWalletStub, "update");
    await sut.handle(fakeHttpRequest());
    expect(loadAllSpy).toHaveBeenCalledWith(id, makeFakeWallet());
  });

  test("Should return 500 if UpdateWallet throws", async () => {
    const { sut, updateWalletStub } = makeSut();
    jest
      .spyOn(updateWalletStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );

    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should update one Wallet and return status 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(ok(makeFakeWallet()));
  });
});
