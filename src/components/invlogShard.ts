import WebSocket from "ws";

export class InvlogShard {
  stats: any;
  id: number;
  controllerId: number | undefined;
  socket: WebSocket;

  public constructor(id: number, socket: WebSocket) {
    this.socket = socket;
    this.id = id;
    this.controllerId = undefined;
  }
}
