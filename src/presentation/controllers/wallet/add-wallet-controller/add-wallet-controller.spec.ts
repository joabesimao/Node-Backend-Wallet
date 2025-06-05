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

const makeFakeClientModel = (): Wallet => ({
  positions: [],
});

interface SutTypes {
  sut: AddWalletController;
  addWalletStub: AddWallet;
}
const makeAddWalletStub = (): AddWallet => {
  class AddClientStub implements AddWallet {
    async add(wallet: AddWalletModel): Promise<Wallet> {
      return new Promise((resolve) => resolve(makeFakeClientModel()));
    }
  }
  return new AddClientStub();
};

const makeSut = (): SutTypes => {
  const addWalletStub = makeAddWalletStub();
  const sut = new AddWalletController(addWalletStub);
  return {
    sut,
    addWalletStub,
  };
};

describe("addWallet Controller", () => {
  test("Should call addWallet with correct values", async () => {
    const { sut, addWalletStub } = makeSut();
    const addRegisterSpy = jest.spyOn(addWalletStub, "add");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addRegisterSpy).toHaveBeenCalledWith({
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

  test("Should return 500 if AddClient throws", async () => {
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

  test("Should return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClientModel()));
  });
});
