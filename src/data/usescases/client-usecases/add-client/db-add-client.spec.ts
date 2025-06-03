import { DbAddClient } from "./db-add-client";
import { AddClientRepository } from "../../../protocols/db/client/add-client";
import { Client } from "../../../../domain/models/client-model/client";
import { AddClientModel } from "../../../../domain/usescases/client/add-client";

interface SutTypes {
  sut: DbAddClient;
  clientRepositoryStub: AddClientRepository;
}

const makeAddClient = (): AddClientModel => ({
  client: {
    name: "any_name",
    document: "any_doc",
  },
});

const makeClient = (): Client => ({
  name: "any_name",
  document: "any_doc",
});

const makeClientRepository = (): AddClientRepository => {
  class ClientRepositoryStub implements AddClientRepository {
    async add(client: AddClientModel): Promise<Client> {
      return new Promise((resolve) => resolve(makeClient()));
    }
  }
  return new ClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const clientRepositoryStub = makeClientRepository();

  const sut = new DbAddClient(clientRepositoryStub);
  return {
    sut,
    clientRepositoryStub,
  };
};

describe("DbAddClient Usecase", () => {
  test("Should call AddClientRepository with correct values", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(clientRepositoryStub, "add");
    await sut.add(makeAddClient());
    expect(addSpy).toHaveBeenCalledWith({
      client: {
        name: "any_name",
        document: "any_doc",
      },
    });
  });
});
