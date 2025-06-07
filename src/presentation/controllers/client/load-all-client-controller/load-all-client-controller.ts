import { LoadClient } from "../../../../domain/usescases/client/load-client";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadAllClientController implements Controller {
  constructor(private readonly loadAllClient: LoadClient) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadAllClientsList = await this.loadAllClient.load();
      return ok(loadAllClientsList);
    } catch (error) {
      return serverError(error);
    }
  }
}
