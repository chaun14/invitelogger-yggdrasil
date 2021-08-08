import WebSocket from "ws";
import { YggdrasilServer } from "../yggdrasil";

export class InvlogShard {
  server: YggdrasilServer;
  socket: WebSocket;

  stats: any;
  id: number;
  controllerId: number | undefined;

  public constructor(server: YggdrasilServer, id: number, socket: WebSocket) {
    this.server = server;
    this.socket = socket;
    this.id = id;
    this.controllerId = undefined;
  }
}
