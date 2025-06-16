import { DeleteWalletById } from "../../../../domain/usescases/wallet/delete-wallet";
import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http/http";

export class DeleteWalletController implements Controller {
  constructor(private readonly deleteWalletById: DeleteWalletById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const deletedWallet = await this.deleteWalletById.deleteById(
        httpRequest.params.id
      );
      return ok(deletedWallet);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
