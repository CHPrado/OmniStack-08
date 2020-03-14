import { Request } from 'express';
import io from 'socket.io';

export interface AppRequestProps extends Request {
  io: io.Server;
  connectedUsers: object;
}
