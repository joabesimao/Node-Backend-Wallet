import { AddStock } from "../../../../domain/usescases/stock/add-stock";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class AddStockController implements Controller {
  constructor(private readonly addStock: AddStock) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addStock = await this.addStock.add(httpRequest.body);
      return ok(addStock);
    } catch (error) {
      return serverError(error);
    }
  }
}
