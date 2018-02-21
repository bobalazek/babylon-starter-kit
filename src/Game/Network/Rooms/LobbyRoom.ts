import { Room } from "colyseus";

export class LobbyRoom extends Room {

    onInit (options) {
        console.log("Lobby created!", options);

        this.setState({
            messages: [],
        });
    }

    onJoin (client) {
        this.state.messages.push(`${ client.sessionId } joined.`);
    }

    onLeave (client) {
        this.state.messages.push(`${ client.sessionId } left.`);
    }

    onMessage (client, data) {
        this.state.messages.push(`(${ client.sessionId }) ${ data.message }`);
        console.log("BasicRoom received message from", client.sessionId, ":", data);
    }

    onDispose () {
        console.log("Dispose Lobby");
    }

}
