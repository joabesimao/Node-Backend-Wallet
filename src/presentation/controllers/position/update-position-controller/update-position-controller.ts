import { UpdatePosition } from "../../../../domain/usescases/position/update-position";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class UpdatePositionController implements Controller {
  constructor(private readonly updatePosition: UpdatePosition) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const updatePosition = await this.updatePosition.update(
        httpRequest.params.id,
        httpRequest.body
      );
      return ok(updatePosition);
    } catch (error) {
      return serverError(error);
    }
  }
}
