import { AddClientController } from "./add-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import {
  Client,
  ClientModel,
} from "../../../../domain/models/client-model/client";
import {
  AddClient,
  AddClientModel,
} from "../../../../domain/usescases/client/add-client";

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
});

interface SutTypes {
  sut: AddClientController;
  addClientStub: AddClient;
}
const makeAddClientStub = (): AddClient => {
  class AddClientStub implements AddClient {
    async add(client: AddClientModel): Promise<Client> {
      return new Promise((resolve) => resolve(makeFakeClient()));
    }
  }
  return new AddClientStub();
};

const makeSut = (): SutTypes => {
  const addClientStub = makeAddClientStub();
  const sut = new AddClientController(addClientStub);
  return {
    sut,
    addClientStub,
  };
};

describe("AddClient Controller", () => {
  test("Should call AddClient with correct values", async () => {
    const { sut, addClientStub } = makeSut();
    const addClientSpy = jest.spyOn(addClientStub, "add");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addClientSpy).toHaveBeenCalledWith({
      document: "any_document",
      name: "any_name",
    });
  });

  test("Should return 500 if AddClient throws", async () => {
    const { sut, addClientStub } = makeSut();
    jest
      .spyOn(addClientStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should add a Client and return  200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClient()));
  });
});
