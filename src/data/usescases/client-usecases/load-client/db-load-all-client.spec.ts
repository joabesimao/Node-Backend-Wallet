import { DbLoadAllClients } from "./db-load-all-clients";
import { LoadAllClientRepository } from "../../../protocols/db/client/load-all-client";
import { Client } from "../../../../domain/models/client-model/client";

interface SutTypes {
  sut: DbLoadAllClients;
  clientRepositoryStub: LoadAllClientRepository;
}

const makeClient = (): Client[] => {
  return [
    {
      name: "any_name",
      document: "",
    },
    {
      name: "other_name",
      document: "",
    },
  ];
};

const makeClientRepository = (): LoadAllClientRepository => {
  class ClientRepositoryStub implements LoadAllClientRepository {
    async loadAll(): Promise<Client[]> {
      return new Promise((resolve) => resolve(makeClient()));
    }
  }
  return new ClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const clientRepositoryStub = makeClientRepository();
  const sut = new DbLoadAllClients(clientRepositoryStub);
  return {
    sut,
    clientRepositoryStub,
  };
};

describe("DbLoadAllClient Usecase", () => {
  test("Should call LoadAllClientRepository with correct values", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(clientRepositoryStub, "loadAll");
    await sut.load();
    expect(loadSpy).toHaveBeenCalled();
  });
});
