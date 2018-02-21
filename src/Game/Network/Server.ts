import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';
import 'dotenv/config';

import { LobbyRoom } from './Rooms/LobbyRoom';

const port = Number(process.env.GAME_SERVER_PORT || 8081);

const app = express();
const httpServer = createServer(app);
const gameServer = new Server({ server: httpServer });

gameServer.register("lobby", LobbyRoom);
gameServer.listen(port);

console.log(`Game server is listening on http://localhost:${ port }`);
