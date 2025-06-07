import { LoadOneController } from "./load-one-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { LoadClientById } from "../../../../domain/usescases/client/load-client";
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
  sut: LoadOneController;
  loadOneClientStub: LoadClientById;
}
const makeLoadOneClientStub = (): LoadClientById => {
  class LoadoneClientStub implements LoadClientById {
    async loadOne(id: number): Promise<Client> {
      return new Promise((resolve) => resolve(makeFakeClient()));
    }
  }
  return new LoadoneClientStub();
};

const makeSut = (): SutTypes => {
  const loadOneClientStub = makeLoadOneClientStub();
  const sut = new LoadOneController(loadOneClientStub);
  return {
    sut,
    loadOneClientStub,
  };
};

describe("LoadOneClient Controller", () => {
  test("Should call LoadOneClient with correct values", async () => {
    const { sut, loadOneClientStub } = makeSut();
    const loadOneClientSpy = jest.spyOn(loadOneClientStub, "loadOne");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(loadOneClientSpy).toHaveBeenCalledWith(1);
  });

  test("Should return 500 if LoadOneClient throws", async () => {
    const { sut, loadOneClientStub } = makeSut();
    jest
      .spyOn(loadOneClientStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should load one Client and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClient()));
  });
});
