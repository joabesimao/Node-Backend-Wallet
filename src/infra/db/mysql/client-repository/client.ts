import { AddClientRepository } from "../../../../data/protocols/db/client/add-client";
import { DeleteClientRepository } from "../../../../data/protocols/db/client/delete-client";
import { LoadAllClientRepository } from "../../../../data/protocols/db/client/load-all-client";
import { LoadOneClientRepository } from "../../../../data/protocols/db/client/load-one-client";
import { UpdateClientRepository } from "../../../../data/protocols/db/client/update-client";
import { Client } from "../../../../domain/models/client-model/client";
import { AddClientModel } from "../../../../domain/usescases/client/add-client";
import { prisma } from "../helper/index";

export class ClientRepository
  implements
    AddClientRepository,
    LoadAllClientRepository,
    LoadOneClientRepository,
    UpdateClientRepository,
    DeleteClientRepository
{
  async add(client: AddClientModel): Promise<Client> {
    const addClient = await prisma.client.create({
      data: { name: client.client.name, document: client.client.document },
    });
    return addClient as unknown as Client;
  }

  async loadAll(): Promise<Client[]> {
    const loadAllClient = await prisma.client.findMany({
      select: {
        id: true,
        name: true,
        document: true,
      },
    });
    return loadAllClient;
  }

  async loadOne(id: number): Promise<Client> {
    const oneClient = await prisma.client.findUnique({
      where: {
        id: id,
      },
    });
    return oneClient;
  }
  async update(id: number, info: Partial<Client>): Promise<Client> {
    const updateClient = await prisma.client.update({
      where: {
        id: id,
      },
      data: { ...info },
    });
    return updateClient;
  }
  async delete(id: number): Promise<string> {
    const deleteClient = await prisma.client.delete({
      where: {
        id: id,
      },
    });
    return deleteClient as unknown as string;
  }
}
