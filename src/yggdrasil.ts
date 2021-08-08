import { Server } from "ws";
import yggConfig from "../config.json";
import { InvlogController } from "./components/invlogController";
import { InvlogShard } from "./components/invlogShard";
import { Authenticator } from "./modules/auth";
import { socketManager } from "./modules/socketManager";
export class YggdrasilClient extends Server {
  public authenticator!: Authenticator;
  public config = yggConfig;
  public invlogShards: Map<number, InvlogShard>;
  public invlogControllers: Map<number, InvlogController>;

  public constructor(port: number, wsAuthenticator: Authenticator) {
    super({ port: port, verifyClient: wsAuthenticator.verifyAuth.bind(wsAuthenticator) });

    this.authenticator = wsAuthenticator;
    this.invlogShards = new Map();
    this.invlogControllers = new Map();
  }
}

const auth = new Authenticator(yggConfig.key);
const client = new YggdrasilClient(yggConfig.port, auth);

client.on("listening", () => {
  console.log("socket ready on port " + client.options.port);
});

client.on("connection", (socket) => {
  console.log("socket connected");
  new socketManager(socket, client);
});
