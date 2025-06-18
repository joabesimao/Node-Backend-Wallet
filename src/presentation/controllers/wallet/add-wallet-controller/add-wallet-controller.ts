import { AddWallet } from "../../../../domain/usescases/wallet/add-wallet";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class AddWalletController implements Controller {
  constructor(private readonly addWallet: AddWallet) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addWallet = await this.addWallet.add(httpRequest.body);
      return ok(addWallet);
    } catch (error) {
      return serverError(error);
    }
  }
}
