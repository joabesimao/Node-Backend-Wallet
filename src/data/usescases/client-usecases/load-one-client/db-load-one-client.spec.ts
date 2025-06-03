import { DbLoadOneClient } from "./db-load-one-client";
import { LoadOneClientRepository } from "../../../protocols/db/client/load-one-client";
import { Client } from "../../../../domain/models/client-model/client";

interface SutTypes {
  sut: DbLoadOneClient;
  clientRepositoryStub: LoadOneClientRepository;
}

const makeClient = (): Client => ({
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
  test("Should call LoadOneClientRepository with correct values", async () => {
    const id = 8;
    const { sut, clientRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(clientRepositoryStub, "loadOne");
    await sut.loadOne(id);
    expect(loadSpy).toHaveBeenCalledWith(8);
  });
});
