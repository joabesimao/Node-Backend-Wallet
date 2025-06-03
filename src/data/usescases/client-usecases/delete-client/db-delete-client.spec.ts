import { DbDeleteClient } from "./db-delete-client";
import { DeleteClientRepository } from "../../../protocols/db/client/delete-client";
import { Client } from "../../../../domain/models/client-model/client";

interface SutTypes {
  sut: DbDeleteClient;
  clientRepositoryStub: DeleteClientRepository;
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

const makeClientRepository = (): DeleteClientRepository => {
  class ClientRepositoryStub implements DeleteClientRepository {
    async delete(id: number): Promise<string> {
      return new Promise((resolve) => resolve("Cliente Deletado com Sucesso!"));
    }
  }
  return new ClientRepositoryStub();
};

const makeSut = (): SutTypes => {
  const clientRepositoryStub = makeClientRepository();
  const sut = new DbDeleteClient(clientRepositoryStub);
  return {
    sut,
    clientRepositoryStub,
  };
};

describe("DbLoadAllClient Usecase", () => {
  const id = 7;
  test("Should call LoadAllClientRepository with correct values", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(clientRepositoryStub, "delete");
    await sut.deleteById(id);
    expect(loadSpy).toHaveBeenCalledWith(7);
  });
});
