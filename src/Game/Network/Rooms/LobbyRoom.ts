import { Room } from "colyseus";

export class LobbyRoom extends Room {

    onInit (options) {
        console.log("Lobby created.");
        console.log(options);

        this.setState({
            chatMessages: [],
            actionLogs: [],
            players: {},
        });
    }

    onJoin (client) {
        this.state.players[client.id] = {
            name: 'Guest',
            client: client,
        };
        this.state.actionLogs.push({
            client: client,
            action: 'join',
            message: `${ client.id } joined.`,
        });
    }

    onLeave (client) {
        delete this.state.players[client.id];

        this.state.actionLogs.push({
            client: client,
            action: 'leave',
            message: `${ client.id } joined.`,
        });
    }

    onMessage (client, data) {
        console.log(`LobbyRoom received message from ${ client.id }:`);
        console.log(data);
    }

    onDispose () {
        console.log("Lobby disposed.");
    }

}
