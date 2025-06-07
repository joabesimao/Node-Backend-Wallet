import { LoadAllPosition } from "../../../../domain/usescases/position/load-position";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadAllPositionController implements Controller {
  constructor(private readonly loadAllPosition: LoadAllPosition) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const allPositionList = await this.loadAllPosition.loadAll();
      return ok(allPositionList);
    } catch (error) {
      return serverError(error);
    }
  }
}
