import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import { createServer } from 'http';
import { Server } from 'colyseus';

import { LobbyRoom } from './Game/Network/Rooms/LobbyRoom';

// NEEDS be before the Config include, so we can then reuse that file in browser & node environment
import 'dotenv/config';
import { GAME_SERVER_PORT } from './Game/Config';

////////// App //////////
const expressApplication = express();

expressApplication.use(cors());

expressApplication.get('/ping', function (req, res) {
    res.json({
        start: req.query.start,
        ping: 'pong',
    });
});

////////// HTTP server //////////
const httpServer = createServer(expressApplication);

////////// Game server //////////
const gameServer = new Server({ server: httpServer });

gameServer.register("lobby", LobbyRoom);
gameServer.listen(GAME_SERVER_PORT);

console.log(`Game server is listening on http://localhost:${ GAME_SERVER_PORT }`);
