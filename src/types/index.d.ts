import { Socket } from "socket.io";

export interface controllerInfoData {
  usedRam: number;
  totalRam: number;
  totalRawRam: number;
  proc: string;
  cpuLoad: Array<number>;
  os: string;
}

declare module "socket.io" {
  export interface Socket {
    auth: boolean;
  }
}
