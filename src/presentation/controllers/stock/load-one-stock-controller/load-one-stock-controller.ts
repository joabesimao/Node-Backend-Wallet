import { LoadOneStock } from "../../../../domain/usescases/stock/load-stock";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadOneStockController implements Controller {
  constructor(private readonly loadOneStock: LoadOneStock) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadOneStock = await this.loadOneStock.loadOne(
        httpRequest.params.id
      );
      return ok(loadOneStock);
    } catch (error) {
      return serverError(error);
    }
  }
}
