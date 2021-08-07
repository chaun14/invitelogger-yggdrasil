import { Server } from "ws";
import yggConfig from "../config.json";
import { Authenticator } from "./modules/auth";
export class YggdrasilClient extends Server {
  public authenticator!: Authenticator;
  public config = yggConfig;

  public constructor(port: number, wsAuthenticator: Authenticator) {
    super({ port: port, verifyClient: wsAuthenticator.verifyAuth.bind(wsAuthenticator) });

    this.authenticator = wsAuthenticator;
  }
}

const auth = new Authenticator(yggConfig.key);
const client = new YggdrasilClient(yggConfig.port, auth);

client.on("listening", () => {
  console.log("socket ready on port " + client.options.port);
});
