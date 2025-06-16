import { AddPosition } from "../../../../domain/usescases/position/add-position";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class AddPositionController implements Controller {
  constructor(private readonly addPosition: AddPosition) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addNewPosition = await this.addPosition.add(httpRequest.body);
      return ok(addNewPosition);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
