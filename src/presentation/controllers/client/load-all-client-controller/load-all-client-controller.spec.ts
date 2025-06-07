import { LoadAllClientController } from "./load-all-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { LoadClient } from "../../../../domain/usescases/client/load-client";
import {
  Client,
  ClientModel,
} from "../../../../domain/models/client-model/client";

const makeFakeClientModel = (): ClientModel => ({
  document: "any_document",
  name: "any_name",
});

const makeFakeClientList = (): Client[] => [
  {
    id: 1,
    document: "any_document",
    name: "any_name",
  },
  {
    id: 2,
    document: "other_document",
    name: "other_name",
  },
];

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeClientModel(),
});

interface SutTypes {
  sut: LoadAllClientController;
  loadAllClientStub: LoadClient;
}
const makeLoadAllClientStub = (): LoadClient => {
  class LoadAllClientStub implements LoadClient {
    async load(): Promise<Client[]> {
      return new Promise((resolve) => resolve(makeFakeClientList()));
    }
  }
  return new LoadAllClientStub();
};

const makeSut = (): SutTypes => {
  const loadAllClientStub = makeLoadAllClientStub();
  const sut = new LoadAllClientController(loadAllClientStub);
  return {
    sut,
    loadAllClientStub,
  };
};

describe("LoadAllClient Controller", () => {
  test("Should call LoadAllClient with correct values", async () => {
    const { sut, loadAllClientStub } = makeSut();
    const addClientSpy = jest.spyOn(loadAllClientStub, "load");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(addClientSpy).toHaveBeenCalled();
  });

  test("Should return 500 if LoadAllClient throws", async () => {
    const { sut, loadAllClientStub } = makeSut();
    jest
      .spyOn(loadAllClientStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load a list of Client and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClientList()));
  });
});
