import { UpdateStock } from "../../../../domain/usescases/stock/update-stock";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class UpdateStockController implements Controller {
  constructor(private readonly updateStock: UpdateStock) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const updateStock = await this.updateStock.update(
        httpRequest.params.id,
        httpRequest.body
      );
      return ok(updateStock);
    } catch (error) {
      return serverError(error);
    }
  }
}
