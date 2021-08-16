import WebSocket from "ws";
import { InvlogController } from "../components/invlogController";
import { InvlogShard } from "../components/invlogShard";
import { controllerInfoData } from "../types";
import { YggdrasilServer } from "../yggdrasil";

interface welcomeMessage {
  type: string;
  key: string;
  id?: number;
  controllerId?: number;
  infos?: controllerInfoData;
}

export class socketManager {
  server: YggdrasilServer;
  public constructor(socket: WebSocket, server: YggdrasilServer, req: any) {
    this.server = server;
    this.registerSocket(socket, req);
  }

  public async registerSocket(socket: WebSocket, req: any) {
    console.log("enable socket register");
    socket.on("message", (data: welcomeMessage) => {
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
