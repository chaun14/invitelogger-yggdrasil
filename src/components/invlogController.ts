import { Socket } from "socket.io";
import { controllerInfoData } from "../types";
import { YggdrasilServer } from "../yggdrasil";

export class InvlogController {
  server: YggdrasilServer;
  socket: Socket;

  infos: controllerInfoData;
  id: number;

  public constructor(server: YggdrasilServer, id: number, socket: Socket, infos: controllerInfoData) {
    console.log("controller " + id + " registered");
    this.server = server;
    this.socket = socket;
    this.id = id;
    this.infos = infos;
  }
}
