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
      id: 1,
      name: "any_name",
      document: "",
    },
    {
      id: 2,
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

  test("Should loadAllClients on success", async () => {
    const { sut } = makeSut();
    const client = await sut.load();
    expect(client).toEqual(makeClient());
  });

  test("Should throw if LoadAllClientRepository throws", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    jest
      .spyOn(clientRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
