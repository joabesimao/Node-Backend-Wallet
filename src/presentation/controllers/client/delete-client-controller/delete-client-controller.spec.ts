import { DeleteClientController } from "./delete-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { DeleteClientById } from "../../../../domain/usescases/client/delete-client";
import {
  Client,
  ClientModel,
} from "../../../../domain/models/client-model/client";

const makeFakeClientModel = (): ClientModel => ({
  document: "any_document",
  name: "any_name",
});

const makeFakeClient = (): Client => ({
  id: 1,
  document: "any_document",
  name: "any_name",
});

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeClientModel(),
  params: {
    id: 1,
  },
});

interface SutTypes {
  sut: DeleteClientController;
  deleteClientStub: DeleteClientById;
}
const makeDeleteClientStub = (): DeleteClientById => {
  class DeleteClientStub implements DeleteClientById {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Deletado com Sucesso!"));
    }
  }
  return new DeleteClientStub();
};

const makeSut = (): SutTypes => {
  const deleteClientStub = makeDeleteClientStub();
  const sut = new DeleteClientController(deleteClientStub);
  return {
    sut,
    deleteClientStub,
  };
};

describe("DeleteClient Controller", () => {
  test("Should call DeleteClient with correct values", async () => {
    const { sut, deleteClientStub } = makeSut();
    const loadOneClientSpy = jest.spyOn(deleteClientStub, "delete");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadOneClientSpy).toHaveBeenCalledWith(1);
  });

  test("Should return 500 if DeleteClient throws", async () => {
    const { sut, deleteClientStub } = makeSut();
    jest
      .spyOn(deleteClientStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should Delete one Client, return a message and 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok("Deletado com Sucesso!"));
  });
});
