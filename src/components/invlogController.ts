import { Socket } from "socket.io";
import { controllerInfoData } from "../types";
import { YggdrasilServer } from "../yggdrasil";

export class InvlogController {
  server: YggdrasilServer;
  socket: Socket;
  totalShard: number;
  advisedShardCount: number;

  infos: controllerInfoData | undefined;
  id: number;

  public constructor(server: YggdrasilServer, id: number, socket: Socket, data: { infos?: controllerInfoData }) {
    console.log(socket.id + " --> controller " + id + " registered");
    this.server = server;
    this.socket = socket;
    this.id = id;
    this.infos = data.infos;
    this.totalShard = server.config.shards.inviteLogger;
    this.advisedShardCount = data.infos ? data.infos.advisedShardCount : 0;
  }
}
