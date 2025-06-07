import { UpdateClientController } from "./update-client-controller";
import { HttpRequest } from "../../../protocols/http/http";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { UpdateClient } from "../../../../domain/usescases/client/update-client";
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
  sut: UpdateClientController;
  updateClientStub: UpdateClient;
}
const makeUpdateClientStub = (): UpdateClient => {
  class UpdateClientStub implements UpdateClient {
    async update(id: number, info: Partial<Client>): Promise<Client> {
      return new Promise((resolve) => resolve(makeFakeClient()));
    }
  }
  return new UpdateClientStub();
};

const makeSut = (): SutTypes => {
  const updateClientStub = makeUpdateClientStub();
  const sut = new UpdateClientController(updateClientStub);
  return {
    sut,
    updateClientStub,
  };
};

describe("UpdateClient Controller", () => {
  test("Should call UpdateClient with correct values", async () => {
    const { sut, updateClientStub } = makeSut();
    const updateClientSpy = jest.spyOn(updateClientStub, "update");
    const fakeRequest = makeFakeRequest();
    await sut.handle(fakeRequest);
    expect(updateClientSpy).toHaveBeenCalledWith(1, makeFakeClientModel());
  });

  test("Should return 500 if UpdateClient throws", async () => {
    const { sut, updateClientStub } = makeSut();
    jest
      .spyOn(updateClientStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()) as any)
      );
    const fakeRequest = makeFakeRequest();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should Update Client and return 200 on sucess", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeClient()));
  });
});
