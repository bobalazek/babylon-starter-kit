import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';

import { LobbyRoom } from './Rooms/LobbyRoom';

// NEEDS be before the Config include, so we can then reuse that file in browser & node environment
import 'dotenv/config';
import { GAME_SERVER_PORT } from '../Config';

////////// App //////////
const app = express();

app.get('/ping', function (req, res) {
    res.send('pong');
});

////////// HTTP server //////////
const httpServer = createServer(app);

////////// Game server //////////
const gameServer = new Server({ server: httpServer });

gameServer.register("lobby", LobbyRoom);
gameServer.listen(GAME_SERVER_PORT);

console.log(`Game server is listening on http://localhost:${ GAME_SERVER_PORT }`);
