import { LoadPositionById } from "../../../../domain/usescases/position/load-position";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadOnePositionController implements Controller {
  constructor(private readonly loadOnePositionById: LoadPositionById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const onePosition = await this.loadOnePositionById.loadById(
        httpRequest.params.id
      );
      return ok(onePosition)
    } catch (error) {
      return serverError(error);
    }
  }
}
