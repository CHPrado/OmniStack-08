import cors from 'cors';
import express, { NextFunction, Response } from 'express';
import http from 'http';
import mongoose, { Mongoose } from 'mongoose';
import io from 'socket.io';

import { AppRequestProps } from './interfaces/AppRequest';
import routes from './routes';

class Server {
  public server: http.Server;

  private express: express.Application;

  private mongoose: Mongoose;

  private ioServer: io.Server;

  private connectedUsers: object;

  public constructor() {
    this.express = express();

    this.server = new (http.Server)(this.express);

    this.mongoose = mongoose;

    this.ioServer = io(this.server);

    this.connectedUsers = {};

    this.middlewares();
    this.dataBase();
  }

  private middlewares(): void {
    this.ioServer.on('connection', (socket) => {
      const { user } = socket.handshake.query;

      this.connectedUsers[user] = socket.id;
    });

    this.express.use((req: AppRequestProps, res: Response, next: NextFunction) => {
      req.io = this.ioServer;
      req.connectedUsers = this.connectedUsers;

      return next();
    });

    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(routes);
  }

  private dataBase(): void {
    this.mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-wkgvv.mongodb.net/tindev?retryWrites=true&w=majority', {
      useNewUrlParser: true, useUnifiedTopology: true,
    });
  }
}

export default new Server().server;
