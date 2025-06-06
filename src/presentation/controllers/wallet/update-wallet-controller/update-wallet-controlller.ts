import { UpdateWallet } from "../../../../domain/usescases/wallet/update-wallet";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class UpdateWalletController implements Controller {
  constructor(private readonly updateWallet: UpdateWallet) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const updateWallet = await this.updateWallet.update(
        httpRequest.params.id,
        httpRequest.body
      );
      return ok(updateWallet);
    } catch (error) {
      return serverError(error);
    }
  }
}
