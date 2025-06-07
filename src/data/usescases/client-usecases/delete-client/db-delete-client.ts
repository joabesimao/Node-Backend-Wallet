import { DeleteClientById } from "../../../../domain/usescases/client/delete-client";
import { DeleteClientRepository } from "../../../protocols/db/client/delete-client";

export class DbDeleteClient implements DeleteClientById {
  constructor(
    private readonly deleteClientRepository: DeleteClientRepository
  ) {}
  async delete(id: number): Promise<string> {
    const deletedlient = await this.deleteClientRepository.delete(id);
    return deletedlient;
  }
}
