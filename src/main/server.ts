import { pool } from "../infra/db/mysql/helper";
import env from "../../env";

pool
  .getConnection()
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(env.serverPort, () =>
      console.log(`Server running at http://localhost:${env.serverPort}`)
    );
  })
  .catch((err) => {
    console.error("erro ao conectar", err);
  });
