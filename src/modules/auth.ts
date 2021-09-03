import jwt, { verify, VerifyCallback } from "jsonwebtoken";
import { Socket } from "socket.io";
import { VerifyClientCallbackAsync, VerifyClientCallbackSync } from "ws";

// inspired from https://facundoolano.wordpress.com/2014/10/11/better-authentication-for-socket-io-no-query-strings/
// and http://iostreamer.me/ws/node.js/jwt/2016/05/08/websockets_authentication.html
export class Authenticator {
  public key: string;

  constructor(apiKey: string) {
    this.key = apiKey;
  }

  public verifyAuth(socket: Socket): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      console.log(socket.id + " authenticating");

      socket.auth = false;

      socket.on("authenticate", (data) => {
        //check the auth data sent by the client
        if (data.token) {
          jwt.verify(data.token, this.key, (err: any, decoded: any) => {
            if (err) {
              // wrong token provided
              console.log(socket.id + " failed login");
            } else {
              console.log(socket.id + " login ok");

              // set it to ok
              socket.auth = true;

              // tell our socket that it is welcome in our systems, otherwise it would be very sad
              socket.emit("welcome");

              resolve(true);
            }
          });
        }
      });

      setTimeout(function () {
        //If the socket didn't authenticate at the deadline, disconnect it
        if (!socket.auth) {
          console.log("Disconnecting socket ", socket.id);
          socket.disconnect(true);
          reject("unauthorised");
        }
      }, 1000);
    });
  }
}
