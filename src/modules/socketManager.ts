import { Socket } from "socket.io";
import { InvlogController } from "../components/invlogController";
import { InvlogShard } from "../components/invlogShard";
import { controllerInfoData } from "../types";
import { YggdrasilServer } from "../yggdrasil";
import { Authenticator } from "./auth";

interface welcomeMessage {
  type: string;
  key: string;
  id?: number;
  controllerId?: number;
  infos?: controllerInfoData;
}

export class socketManager {
  server: YggdrasilServer;
  authenticator: Authenticator;

  public constructor(socket: Socket, server: YggdrasilServer, auth: Authenticator) {
    this.server = server;
    this.authenticator = auth;

    this.registerSocket(socket);
  }

  public async registerSocket(socket: Socket) {
    // firstly we need to authenticate it
    let auth = await this.authenticator.verifyAuth(socket);
    if (auth) return;
    console.log("enable socket register");

    socket.on("welcome", (data: welcomeMessage) => {
      console.log("welcome");
      console.log(data);
      if (data.type == "shard" && data.id) {
        let thisShard = new InvlogShard(this.server, data.id, socket);
        this.server.invlogShards.set(data.id, thisShard);
      } else if (data.type == "invlogController" && data.id && data.infos) {
        let thisController = new InvlogController(this.server, data.id, socket, data.infos);
        this.server.invlogControllers.set(data.id, thisController);
      }
    });
  }
}
