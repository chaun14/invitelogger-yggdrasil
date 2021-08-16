import { Socket } from "socket.io";
import { YggdrasilServer } from "../yggdrasil";

export class InvlogShard {
  server: YggdrasilServer;
  socket: Socket;

  stats: any;
  id: number;
  controllerId: number | undefined;

  public constructor(server: YggdrasilServer, id: number, socket: Socket) {
    this.server = server;
    this.socket = socket;
    this.id = id;
    this.controllerId = undefined;
  }
}
