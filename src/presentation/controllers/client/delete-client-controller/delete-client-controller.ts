import { DeleteClientById } from "../../../../domain/usescases/client/delete-client";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class DeleteClientController implements Controller {
  constructor(private readonly deleteClientById: DeleteClientById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const deleteClient = await this.deleteClientById.delete(
        httpRequest.params.id
      );
      return ok(deleteClient);
    } catch (error) {
      return serverError(error);
    }
  }
}
