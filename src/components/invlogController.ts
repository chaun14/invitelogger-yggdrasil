import WebSocket from "ws";
import { controllerInfoData } from "../types";

export class InvlogController {
  infos: controllerInfoData;
  id: number;
  socket: WebSocket;

  public constructor(id: number, socket: WebSocket, infos: controllerInfoData) {
    this.socket = socket;
    this.id = id;
    this.infos = infos;
  }
}
