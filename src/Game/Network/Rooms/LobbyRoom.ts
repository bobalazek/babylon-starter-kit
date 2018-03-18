import { Room } from "colyseus";
import * as uuid from "uuid";

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
        let playerName = 'Guest ' + client.id; // TODO: lookup the player name inside a database or wherever
        this.state.players[client.id] = {
            name: playerName,
            client: client,
        };
        this.state.actionLogs.push({
            client: client,
            action: 'join',
            message: `${ playerName } joined.`,
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

        this.state.chatMessages.push({
            id: uuid.v4(),
            sender: this.state.players[client.id].name,
            text: data.text,
        });
    }

    onDispose () {
        console.log("Lobby disposed.");
    }

}
