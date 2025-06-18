import { DeleteStock } from "../../../../domain/usescases/stock/delete-stock";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class DeleteStockController implements Controller {
  constructor(private readonly deleteStock: DeleteStock) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const deleteStock = await this.deleteStock.delete(httpRequest.params.id);
      return ok(deleteStock);
    } catch (error) {
      return serverError(error);
    }
  }
}
