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

describe("DbDeleteClient Usecase", () => {
  const id = 7;
  test("Should call DeleteClientRepository with correct values", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(clientRepositoryStub, "delete");
    await sut.delete(id);
    expect(loadSpy).toHaveBeenCalledWith(7);
  });

  test("Should delete a client on success", async () => {
    const { sut } = makeSut();
    const client = await sut.delete(id);
    expect(client).toEqual("Cliente Deletado com Sucesso!");
  });

  test("Should throw if DeleteClientRepository throws", async () => {
    const { sut, clientRepositoryStub } = makeSut();
    jest
      .spyOn(clientRepositoryStub, "delete")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error("")))
      );
    const promise = sut.delete(id);
    await expect(promise).rejects.toThrow();
  });
});
