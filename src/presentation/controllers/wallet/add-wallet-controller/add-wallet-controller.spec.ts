import { AddWalletController } from "./add-wallet-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Wallet } from "../../../../domain/models/wallet-model/wallet";
import {
  AddWallet,
  AddWalletModel,
} from "../../../../domain/usescases/wallet/add-wallet";

const makeFakeRequest = (): HttpRequest => ({
  body: {
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

const makeFakeWalletModel = (): Wallet => ({
  positions: [],
});

interface SutTypes {
  sut: AddWalletController;
  addWalletStub: AddWallet;
}
const makeAddWalletStub = (): AddWallet => {
  class AddWalletStub implements AddWallet {
    async add(wallet: AddWalletModel): Promise<Wallet> {
      return new Promise((resolve) => resolve(makeFakeWalletModel()));
    }
  }
  return new AddWalletStub();
};

const makeSut = (): SutTypes => {
  const addWalletStub = makeAddWalletStub();
  const sut = new AddWalletController(addWalletStub);
  return {
    sut,
    addWalletStub,
  };
};

describe("AddWallet Controller", () => {
  test("Should call AddWallet with correct values", async () => {
    const { sut, addWalletStub } = makeSut();
    const addWalletSpy = jest.spyOn(addWalletStub, "add");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addWalletSpy).toHaveBeenCalledWith({
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
    });
  });

  test("Should return 500 if AddWallet throws", async () => {
    const { sut, addWalletStub } = makeSut();
    jest
      .spyOn(addWalletStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should add a wallet and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeWalletModel()));
  });
});
