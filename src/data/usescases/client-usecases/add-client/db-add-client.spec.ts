import { DbAddClient } from "./db-add-client";
import { AddClientRepository } from "../../../protocols/db/client/add-client";
import {
  Client,
  ClientModel,
} from "../../../../domain/models/client-model/client";
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
  id: 1,
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

  test("Should add a client on success", async () => {
    const { sut } = makeSut();
    const client = await sut.add(makeAddClient());
    expect(client).toEqual({
      id: 1,
      name: "any_name",
      document: "any_doc",
    });
  });

  test("Should throw if addClientRepository throws", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    jest
      .spyOn(clientRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const clientData = {
      client: {
        name: "any_name",
        document: "any_doc",
      },
    };
    const promise = sut.add(clientData);
    await expect(promise).rejects.toThrow();
  });
});
