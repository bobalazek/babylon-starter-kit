import * as Colyseus from "colyseus.js";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { GameManager } from "../../Framework/Core/GameManager";
import { AbstractBaseScene } from './AbstractBaseScene';
import { PossessableEntity } from "../../Framework/Gameplay/PossessableEntity";
import { GAME_SERVER_PORT } from '../Config';
import { ChatComponent } from '../UI/Chat';

export class HelloWorldLevel extends AbstractBaseScene {

    public start() {

        super.start();

        // Spawn a spectator camera, until our player is ready
        let camera = new BABYLON.UniversalCamera(
            "spectatorCamera",
            new BABYLON.Vector3(0, 4, -8),
            this.getScene()
        );

        // Player
        this._player = new PossessableEntity(this._getPlayerMesh());

        // Network
        let client = new Colyseus.Client('ws://localhost:' + GAME_SERVER_PORT);
        let lobbyRoom = client.join('lobby');

        // UI
        ReactDOM.render(
            React.createElement(ChatComponent, {
                messages: [],
                isActive: true,
            }),
            document.getElementById('ui')
        );

        lobbyRoom.onUpdate.add((data) => {
            window.dispatchEvent(new CustomEvent('chat:messages', {
                detail: {
                    messages: data.chatMessages,
                },
            }));
        });

        window.addEventListener('chat:messages:new', (event: CustomEvent) => {
            lobbyRoom.send({
                text: event.detail.text,
            });
        }, false);

    }

    private _getPlayerMesh(): BABYLON.AbstractMesh {
        let player = BABYLON.MeshBuilder.CreateSphere("player", {
            diameterX: 1,
            diameterY: 2,
            diameterZ: 0.5,
        }, this.getScene());

        player.position = new BABYLON.Vector3(0, 2, 8);
        player.material = new BABYLON.StandardMaterial('playerMaterial', this.getScene());
        player.material.alpha = 0.8;
        player.physicsImpostor = new BABYLON.PhysicsImpostor(
            player,
            BABYLON.PhysicsImpostor.SphereImpostor,
            {
                mass: 1,
                restitution: 0,
            },
            this.getScene()
        );
        player.physicsImpostor.physicsBody.angularDamping = 1;

        return player;
    }

}
