import { DeletePositionById } from "../../../../domain/usescases/position/delete-position";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class DeletePositionController implements Controller {
  constructor(private readonly deletePositionById: DeletePositionById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const deletePosition = await this.deletePositionById.deleteById(
        httpRequest.params.id
      );
      return ok(deletePosition);
    } catch (error) {
      return serverError(error);
    }
  }
}
