import * as Colyseus from "colyseus.js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from 'axios';
import { Key as KeyboardKey } from 'ts-keycode-enum';

import {
    GAME_SERVER_PORT,
    GAME_SERVER_HOST,
    GAME_SERVER_UPDATE_RATE
} from '../Config';
import { GameManager } from "../../Framework/Core/GameManager";
import { AbstractBaseScene } from './AbstractBaseScene';
import { PossessableEntity } from "../../Framework/Gameplay/PossessableEntity";
import { ChatComponent } from '../UI/ChatComponent';
import { DebugComponent } from '../UI/DebugComponent';

export class HelloWorldLevel extends AbstractBaseScene {

    public showChatInputKeyCode = KeyboardKey.T;
    public hideChatInputKeyCode = KeyboardKey.Escape;

    public serverHost: string = GAME_SERVER_HOST + ':' + GAME_SERVER_PORT;

    /**
     * What is the still acceptable tolerance for position/rotation to send the update to the server?
     */
    public serverPlayerTransformUpdateTolerance: number = 0.001;

    public start() {

        super.start();

        /********** Spectator camera **********/
        let camera = new BABYLON.UniversalCamera(
            "spectatorCamera",
            new BABYLON.Vector3(0, 4, -8),
            this.getScene()
        );

        /********** Player ************/
        this._player = new PossessableEntity(this._getPlayerMesh());

        /********** Network **********/
        let client = new Colyseus.Client('ws://' + this.serverHost);
        let lobbyRoom = client.join('lobby');

        /***** Chat *****/
        let chatInputShown = false;

        lobbyRoom.listen('chatMessages/:id', (change) => {
            window.dispatchEvent(new CustomEvent('chat:messages:update', {
                detail: {
                    messages: change.value,
                },
            }));
        });

        window.addEventListener('chat:messages:new', (event: CustomEvent) => {
            lobbyRoom.send({
                action: 'chat:messages:new',
                detail: {
                    text: event.detail.text,
                },
            });
        }, false);

        window.addEventListener('keydown', (e) => {
            if (
                (
                    !chatInputShown &&
                    e.keyCode === this.showChatInputKeyCode
                ) || (
                    chatInputShown &&
                    e.keyCode === this.hideChatInputKeyCode
                )
            ) {
                window.dispatchEvent(new Event('chat:input:toggle'));
                chatInputShown = !chatInputShown;
            }
        }, false);

        /***** Debug *****/
        let ping: number = 0;
        setInterval(() => {
            let requestStart = (new Date()).getTime();
            axios.get('http://' + this.serverHost + '/ping?start=' + requestStart)
                .then((res) => {
                    const requestEnd = (new Date()).getTime();
                    ping = Math.round(requestEnd - requestStart);
                }).catch(() => {
                    ping = -1;
                });
            window.dispatchEvent(new CustomEvent('debug:update', {
                detail: {
                    ping: ping,
                    fps: Math.round(this.getScene().getEngine().getFps()),
                },
            }));
        }, 1000);

        /***** Player updates *****/
        let lastPlayerUpdateDetail = null;
        setInterval(() => {
            // only update the player if something has really changed
            if (
                lastPlayerUpdateDetail === null ||
                !this._player.isMeshTransformSameAs(
                    lastPlayerUpdateDetail,
                    this.serverPlayerTransformUpdateTolerance
                )
            ) {
                const playerUpdateDetail = this._player.getMeshTransform();
                lobbyRoom.send({
                    action: 'player:transform:update',
                    detail: playerUpdateDetail,
                });
                lastPlayerUpdateDetail = playerUpdateDetail;
            }
        }, 1000 / GAME_SERVER_UPDATE_RATE);

        /********** UI **********/
        ReactDOM.render(
            React.createElement(
                'div',
                {
                    id: 'ui-inner',
                },
                React.createElement(ChatComponent),
                React.createElement(DebugComponent)
            ),
            document.getElementById('ui')
        );

    }

    private _getPlayerMesh(): BABYLON.AbstractMesh {
        let player = BABYLON.MeshBuilder.CreateSphere('player', {
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
