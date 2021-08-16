import { Server } from "ws";
import yggConfig from "../config.json";
import { InvlogController } from "./components/invlogController";
import { InvlogShard } from "./components/invlogShard";
import { Authenticator } from "./modules/auth";
import { socketManager } from "./modules/socketManager";
export class YggdrasilServer extends Server {
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
const server = new YggdrasilServer(yggConfig.port, auth);

server.on("listening", () => {
  console.log("socket ready on port " + server.options.port);
});

server.on("connection", (socket, req) => {
  console.log("socket connected");

  socket.emit("re", "cc");
  socket.on("welcome", (data) => {
    console.log("welcomed");
  });

  new socketManager(socket, server, req);
});

server.on("message", (data: any) => {
  console.log(data);
});
