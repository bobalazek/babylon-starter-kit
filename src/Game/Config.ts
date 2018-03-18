const GAME_SERVER_PORT = Number(process.env.GAME_SERVER_PORT || 8081);
const SERVER_UPDATE_RATE = Number(process.env.SERVER_UPDATE_RATE || 5); // how many times per second should we send the updates to the server?

export {
    GAME_SERVER_PORT,
    SERVER_UPDATE_RATE
}
