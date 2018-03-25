import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from 'axios';
import { DataChange } from 'delta-listener';
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
import { PreloaderComponent } from '../UI/PreloaderComponent';

export class HelloWorldLevel extends AbstractBaseScene {

    protected _serverEnable: boolean = true;
    protected _serverRoomName: string = 'lobby';

    /**
     * What key do we need to press to open the chat input?
     */
    public showChatInputKeyCode = KeyboardKey.T;

    /**
     * What key do we need to press to close the chat input?
     */
    public hideChatInputKeyCode = KeyboardKey.Escape;

    /**
     * What is the still acceptable tolerance for position/rotation to send the update to the server?
     */
    public serverPlayerTransformUpdateTolerance: number = 0.001;

    /**
     * The interpolation smoothing for the server. Should be a value between 0 and 1,
     */
    public serverInterpolationSmoothing: number = 0.2;

    public onPreStart(callback: () => void) {
        this._prepareUI();

        callback();
    }

    public start() {

        super.start();

        // A temporary camera until the player has loaded and ready
        let camera = new BABYLON.UniversalCamera(
            "spectatorCamera",
            new BABYLON.Vector3(0, 4, -8),
            this.getScene()
        );

        this._prepareChat();
        this._preparePlayer();
        this._prepareUIDebug();
        this._prepareNetworkSync();

    }

    public onReady() {
        window.dispatchEvent(new Event('preloader:hide'));
    }

    private _prepareChat() {
        let chatInputShown = false;

        this._serverRoom.listen('chatMessages/:id', (change) => {
            window.dispatchEvent(new CustomEvent('chat:messages:update', {
                detail: {
                    messages: change.value,
                },
            }));
        });

        window.addEventListener('chat:messages:new', (event: CustomEvent) => {
            this._serverRoom.send({
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
                GameManager.inputManager.exitPointerLock();
                window.dispatchEvent(new Event('chat:input:toggle'));
                chatInputShown = !chatInputShown;
            }
        }, false);
    }

    private _preparePlayer() {
        const serverClientId = this._serverClient.id; // TODO: sometimes it happens, that it's not set. Not yet sure why.
        const playerId = 'player_' + serverClientId;
        const min = -50;
        const max = 50;
        const randomX = Math.floor(Math.random() * (max - min) + min);
        const randomZ = Math.floor(Math.random() * (max - min) + min);

        this._player = new PossessableEntity(this._getPlayerMesh(playerId));
        this._player.getMesh().position.addInPlace(
            new BABYLON.Vector3(
                randomX,
                0,
                randomZ
            )
        );

        this._serverClient.onOpen.add(() => {
            this._player.syncWithServer(
                this._serverRoom,
                this.serverPlayerTransformUpdateTolerance,
                1000 / GAME_SERVER_UPDATE_RATE
            );
        });
    }

    private _prepareUI() {
        ReactDOM.render(
            React.createElement(
                'div',
                {
                    id: 'ui-inner',
                },
                React.createElement(PreloaderComponent, {
                    text: 'Level is loading ...',
                }),
                React.createElement(ChatComponent),
                React.createElement(DebugComponent)
            ),
            document.getElementById('ui')
        );
    }

    private _prepareUIDebug() {
        let ping: number = 0;
        setInterval(() => {
            const requestStart = (new Date()).getTime();
            axios.get('http://' + this._serverHost + '/ping?start=' + requestStart)
                .then((res) => {
                    const requestEnd = (new Date()).getTime();
                    ping = Math.round(requestEnd - requestStart);
                }).catch(() => {
                    ping = -1;
                });
            window.dispatchEvent(new CustomEvent('debug:update', {
                detail: {
                    ping: ping,
                    fps: Math.round(GameManager.engine.getFps()),
                },
            }));
        }, 1000);
    }

    protected _prepareNetworkSync() {
        // Add & update the entities
        this._serverRoom.listen('entities/:id/transformMatrix', (change: DataChange) => {
            const entityId = change.path.id;
            const entityIdSplit = entityId.split('_');
            const type = entityIdSplit[0];
            const id = entityIdSplit[1];
            const isLocalEntity = id === this._serverClient.id;
            if (
                !isLocalEntity &&
                type === 'player'
            ) {
                const transformMatrixSplit = change.value.split('|');
                let playerMesh: BABYLON.AbstractMesh;

                 if (change.operation === 'add') {
                     playerMesh = this._getPlayerMesh(entityId);
                     playerMesh.metadata = {
                         serverReplicated: true,
                     };
                 } else {
                     playerMesh = this.getScene().getMeshByID(entityId);
                 }

                if (change.operation === 'remove') {
                    playerMesh.dispose();
                    return;
                }

                const playerMeshPosition = new BABYLON.Vector3(
                    transformMatrixSplit[0],
                    transformMatrixSplit[1],
                    transformMatrixSplit[2]
                );
                const playerMeshRotation = new BABYLON.Quaternion(
                    transformMatrixSplit[3],
                    transformMatrixSplit[4],
                    transformMatrixSplit[5],
                    transformMatrixSplit[6]
                );

                if (change.operation === 'add') {
                    playerMesh.position = playerMeshPosition;
                    playerMesh.rotationQuaternion = playerMeshRotation;
                } else {
                    playerMesh.metadata.serverLastUpdate = (new Date()).getTime();
                    playerMesh.metadata.serverPosition = playerMeshPosition;
                    playerMesh.metadata.serverRotation = playerMeshRotation;
                }
            }
        });

        // Remove entities
        this._serverRoom.listen('entities/:id', (change: DataChange) => {
            if (change.operation === 'remove') {
                const entityId = change.path.id;
                let entityMesh = this.getScene().getMeshByID(entityId);
                entityMesh.dispose();
            }
        });

        // Interpolation
        this.getScene().onBeforeRenderObservable.add(() => {
            const now = (new Date()).getTime();
            this.getScene().meshes.forEach((mesh: BABYLON.AbstractMesh) => {
                if (
                    mesh.metadata !== null &&
                    mesh.metadata.serverReplicated === true &&
                    now - mesh.metadata.serverLastUpdate < 1000
                ) {
                    mesh.position = BABYLON.Vector3.Lerp(
                        mesh.position,
                        mesh.metadata.serverPosition,
                        this.serverInterpolationSmoothing
                    );
                    mesh.rotationQuaternion = BABYLON.Quaternion.Slerp(
                        mesh.rotationQuaternion,
                        mesh.metadata.serverRotation,
                        this.serverInterpolationSmoothing
                    )
                }
            });
        });
    }

    private _getPlayerMesh(playerId: string): BABYLON.AbstractMesh {
        let player = BABYLON.MeshBuilder.CreateSphere(playerId, {
            diameterX: 1,
            diameterY: 2,
            diameterZ: 0.5,
        }, this.getScene());

        player.position = new BABYLON.Vector3(0, 2, 0);
        player.material = new BABYLON.StandardMaterial(playerId + '_playerMaterial', this.getScene());
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
