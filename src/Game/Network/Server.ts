import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';

import { LobbyRoom } from './Rooms/LobbyRoom';

const port = Number(process.env.SERVER_PORT || 1235);

const app = express();
const httpServer = createServer(app);
const gameServer = new Server({ server: httpServer });

gameServer.register("lobby", LobbyRoom);
gameServer.listen(port);
console.log(`Listening on http://localhost:${ port }`);
