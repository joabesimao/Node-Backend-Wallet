import { DbLoadOneClient } from "./db-load-one-client";
import { LoadOneClientRepository } from "../../../protocols/db/client/load-one-client";
import { Client } from "../../../../domain/models/client-model/client";

interface SutTypes {
  sut: DbLoadOneClient;
  clientRepositoryStub: LoadOneClientRepository;
}

const makeClient = (): Client => ({
  id: 1,
  name: "any_name",
  document: "any_doc",
});

const makeClientRepository = (): LoadOneClientRepository => {
  class ClientRepositoryStub implements LoadOneClientRepository {
    async loadOne(id: number): Promise<Client> {
      return new Promise((resolve) => resolve(makeClient()));
    }
  }
  return new ClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const clientRepositoryStub = makeClientRepository();
  const sut = new DbLoadOneClient(clientRepositoryStub);
  return {
    sut,
    clientRepositoryStub,
  };
};

describe("DbLoadAllClient Usecase", () => {
  const id = 8;
  test("Should call LoadOneClientRepository with correct values", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(clientRepositoryStub, "loadOne");
    await sut.loadOne(id);
    expect(loadSpy).toHaveBeenCalledWith(8);
  });

  test("Should load one client on success", async () => {
    const { sut } = makeSut();
    const client = await sut.loadOne(id);
    expect(client).toEqual({
      id: 1,
      name: "any_name",
      document: "any_doc",
    });
  });

  test("Should throw if LoadOneClientRepository throws", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    jest
      .spyOn(clientRepositoryStub, "loadOne")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );

    const promise = sut.loadOne(id);
    await expect(promise).rejects.toThrow();
  });
});
