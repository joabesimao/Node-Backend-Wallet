import { DbUpdateClient } from "./db-update-client";
import { UpdateClientRepository } from "../../../protocols/db/client/update-client";
import { Client } from "../../../../domain/models/client-model/client";

interface SutTypes {
  sut: DbUpdateClient;
  clientRepositoryStub: UpdateClientRepository;
}

const makeClient = (): Client => ({
  name: "any_name",
  document: "any_doc",
});

const makeClientRepository = (): UpdateClientRepository => {
  class ClientRepositoryStub implements UpdateClientRepository {
    async update(id: number, info: Partial<Client>): Promise<Client> {
      return new Promise((resolve) => resolve(makeClient()));
    }
  }
  return new ClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const clientRepositoryStub = makeClientRepository();
  const sut = new DbUpdateClient(clientRepositoryStub);
  return {
    sut,
    clientRepositoryStub,
  };
};

describe("DbUpdateClient Usecase", () => {
  test("Should call LoadOneClientRepository with correct values", async () => {
    const id = 8;
    const { sut, clientRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(clientRepositoryStub, "update");
    await sut.update(id, makeClient());
    expect(loadSpy).toHaveBeenCalledWith(8, {
      name: "any_name",
      document: "any_doc",
    });
  });
});
