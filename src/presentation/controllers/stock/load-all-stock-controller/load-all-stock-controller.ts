import { LoadAllStock } from "../../../../domain/usescases/stock/load-stock";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadAllStockController implements Controller {
  constructor(private readonly loadAllStock: LoadAllStock) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadStockList = await this.loadAllStock.loadAll();
      return ok(loadStockList);
    } catch (error) {
      return serverError(error);
    }
  }
}
