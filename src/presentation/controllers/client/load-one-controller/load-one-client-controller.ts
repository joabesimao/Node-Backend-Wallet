import { LoadClientById } from "../../../../domain/usescases/client/load-client";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadOneController implements Controller {
  constructor(private readonly loadOneClientById: LoadClientById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const oneClient = await this.loadOneClientById.loadOne(
        httpRequest.params.id
      );
      return ok(oneClient);
    } catch (error) {
      return serverError(error);
    }
  }
}
