import 'babylonjs-materials';
import * as Colyseus from "colyseus.js";

import {
    GAME_SERVER_PORT,
    GAME_SERVER_HOST
} from '../Config';
import { GameManager } from "../../Framework/Core/GameManager";
import { AbstractLevel } from '../../Framework/Level/AbstractLevel';

export class AbstractBaseScene extends AbstractLevel {

    // General
    protected _skybox: BABYLON.Mesh;

    // Network
    protected _serverEnable: boolean = false;
    protected _serverHost: string = GAME_SERVER_HOST + ':' + GAME_SERVER_PORT;
    protected _serverRoom: Colyseus.Room;
    protected _serverRoomName: string;

    // Other
    protected _worldSize: number = 4096;
    protected _oceanDepth: number = 32;

    public start() {

        this.getScene().collisionsEnabled = true;
        this.getScene().enablePhysics();

        this._prepareNetwork();
        this._prepareSkybox(this._worldSize);
        this._prepareOcean(this._worldSize);
        this._prepareGround(this._worldSize / 16);
        this._prepareLights();

    }

    protected _prepareNetwork() {
        if (
            this._serverEnable &&
            this._serverRoomName !== undefined
        ) {
            const client = new Colyseus.Client('ws://' + this._serverHost);
            this._serverRoom = client.join(this._serverRoomName);
        }
    }

    protected _prepareSkybox(size: number) {

        this._skybox = BABYLON.Mesh.CreateBox('skybox', size, this.getScene());
        this._skybox.infiniteDistance = true;

        let skyboxMaterial = new BABYLON.SkyMaterial('skyboxMaterial', this.getScene());
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.inclination = 0;
        skyboxMaterial.luminance = 1;
        skyboxMaterial.turbidity = 20;

        this._skybox.material = skyboxMaterial;

    }

    protected _prepareOcean(size: number) {

        // Underwater ground
        let underwaterGround = BABYLON.Mesh.CreateGround(
            "underwaterGround",
            size,
            size,
            1,
            this.getScene(),
            false
        );

        underwaterGround.position.y = -this._oceanDepth;

        let underwaterGroundMaterial = new BABYLON.StandardMaterial('underwaterGroundMaterial', this.getScene());
        let underwaterGroundTexture = new BABYLON.Texture('static/textures/underwater_ground_diffuse.jpg', this.getScene());

        underwaterGroundTexture.uScale = underwaterGroundTexture.vScale = size / 64;

        underwaterGroundMaterial.diffuseTexture = underwaterGroundTexture;

        underwaterGround.material = underwaterGroundMaterial;

        underwaterGround.checkCollisions = true;

        underwaterGround.physicsImpostor = new BABYLON.PhysicsImpostor(
            underwaterGround,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0 },
            this.getScene()
        );

        // Water
        let water = BABYLON.Mesh.CreateGround(
            'water',
            size,
            size,
            size / 16,
            this.getScene(),
            false
        );
        let waterMaterial = new BABYLON.WaterMaterial('waterMaterial', this.getScene());
        let waterBumpTexture = new BABYLON.Texture('static/textures/water_bump.jpg', this.getScene());

        waterMaterial.bumpTexture = waterBumpTexture;
        waterMaterial.backFaceCulling = true;
        waterMaterial.windForce = 1;
        waterMaterial.waveHeight = 0.1;
        waterMaterial.waveLength = 0.1;
        waterMaterial.bumpHeight = 0.1;
        waterMaterial.windDirection = new BABYLON.Vector2(-1, 1);
        waterMaterial.waterColor = new BABYLON.Color3(0, 0, 221 / 255);
        waterMaterial.colorBlendFactor = 0.1;
        waterMaterial.addToRenderList(this._skybox);
        waterMaterial.addToRenderList(underwaterGround);

        water.material = waterMaterial;

    }

    protected _prepareGround(size: number) {

        let ground = BABYLON.Mesh.CreateGround(
            "ground",
            size,
            size,
            2,
            this.getScene()
        );
        ground.position.y = 1;

        let groundMaterial = new BABYLON.StandardMaterial('groundMaterial', this.getScene());
        let groundTexture = new BABYLON.Texture('static/textures/ground_diffuse.jpg', this.getScene());

        groundTexture.uScale = groundTexture.vScale = size / 8;

        groundMaterial.diffuseTexture = groundTexture;

        ground.material = groundMaterial;

        ground.checkCollisions = true;

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(
            ground,
            BABYLON.PhysicsImpostor.BoxImpostor,
            { mass: 0, restitution: 0 },
            this.getScene()
        );

    }

    protected _prepareLights() {

        let hemiLight = new BABYLON.HemisphericLight(
            'hemiLight',
            new BABYLON.Vector3(0, 0, 0),
            this.getScene()
        );
        hemiLight.intensity = 0.7;

    }

}
