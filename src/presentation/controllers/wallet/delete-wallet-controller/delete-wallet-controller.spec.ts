import { DeleteWalletController } from "./delete-wallet-controlller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { DeleteWalletById } from "../../../../domain/usescases/wallet/delete-wallet";

const fakeHttpRequest = (): HttpRequest => ({
  body: {},
  params: {
    id: 5,
  },
});

interface SutTypes {
  sut: DeleteWalletController;
  deleteWalletStub: DeleteWalletById;
}
const makeDeleteWalletStub = (): DeleteWalletById => {
  class DeleteWalletStub implements DeleteWalletById {
    async deleteById(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeleteWalletStub();
};

const makeSut = (): SutTypes => {
  const deleteWalletStub = makeDeleteWalletStub();
  const sut = new DeleteWalletController(deleteWalletStub);
  return {
    sut,
    deleteWalletStub,
  };
};

describe("DeleteWallet Controller", () => {
  test("Should call DeleteWallet with correct values", async () => {
    const { sut, deleteWalletStub } = makeSut();
    const deleteRegisterSpy = jest.spyOn(deleteWalletStub, "deleteById");
    await sut.handle(fakeHttpRequest());
    expect(deleteRegisterSpy).toHaveBeenCalledWith(5);
  });

  test("Should return 500 if DeleteWallet throws", async () => {
    const { sut, deleteWalletStub } = makeSut();
    jest
      .spyOn(deleteWalletStub, "deleteById")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );

    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return a message and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(fakeHttpRequest());
    expect(httpResponse).toEqual(ok("Deletado com Sucesso!"));
  });
});
