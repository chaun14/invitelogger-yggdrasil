import { Socket } from "socket.io";
import { controllerInfoData } from "../types";
import { YggdrasilServer } from "../yggdrasil";

export class InvlogController {
  server: YggdrasilServer;
  socket: Socket;
  totalShard: number;
  advisedShardCount: number;
  shards: Array<number>;

  infos: controllerInfoData | undefined;
  id: number;

  public constructor(server: YggdrasilServer, id: number, socket: Socket, data: { infos?: controllerInfoData }) {
    console.log(socket.id + " --> controller " + id + " registered");
    this.server = server;
    this.socket = socket;
    this.id = id;
    this.infos = data.infos;
    this.totalShard = server.config.shards.inviteLogger;
    this.shards = data.infos?.shards ? data.infos?.shards : [];
    this.advisedShardCount = data.infos ? data.infos.advisedShardCount : 0;
  }
}
