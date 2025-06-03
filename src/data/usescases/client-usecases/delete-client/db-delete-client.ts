import { DeleteById } from "../../../../domain/usescases/wallet/delete-wallet";
import { DeleteClientRepository } from "../../../protocols/db/client/delete-client";

export class DbDeleteClient implements DeleteById {
  constructor(
    private readonly deleteClientRepository: DeleteClientRepository
  ) {}
  async deleteById(id: number): Promise<string> {
    const deletedlient = await this.deleteClientRepository.delete(id);
    return deletedlient;
  }
}
