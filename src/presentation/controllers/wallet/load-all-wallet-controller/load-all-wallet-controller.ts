import { LoadAllWallet } from "../../../../domain/usescases/wallet/load-wallet";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class LoadAllWalletController implements Controller {
  constructor(private readonly loadAllWallet: LoadAllWallet) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const loadAllwallets = await this.loadAllWallet.loadAll();
      return ok(loadAllwallets);
    } catch (error) {
      return serverError(error);
    }
  }
}
