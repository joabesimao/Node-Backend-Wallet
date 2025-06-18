import { GetStockPriceService } from "../../../data/usescases/gateway/gateway-usecase";
import { ok, serverError } from "../../helpers/http/http-helper";
import { Controller } from "../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http/http";

export class StockController implements Controller {
  constructor(private service: GetStockPriceService) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { symbol } = httpRequest.params;
    try {
      const result = await this.service.execute(symbol);
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
