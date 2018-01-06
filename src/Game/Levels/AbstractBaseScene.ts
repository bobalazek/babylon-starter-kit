import 'babylonjs-materials';

import { AbstractLevel } from '../../Framework/AbstractLevel';

export class AbstractBaseScene extends AbstractLevel {

    public skybox: BABYLON.Mesh;

    public worldSize: number = 4096;
    public spawnPoint: BABYLON.Vector3 = new BABYLON.Vector3(0, 36, 0);
    public oceanDepth: number = 32;

    public start() {

        // Skybox
        this.prepareSkybox(this.worldSize);

        // Ocean
        this.prepareOcean(this.worldSize);

        // Ground
        this.prepareGround(this.worldSize / 32);

        // Lights
        this.prepareLights();

    }

    public prepareSkybox(size: number) {
        this.skybox = BABYLON.Mesh.CreateBox("skybox", size, this.getScene());
        this.skybox.infiniteDistance = true;

        let skyboxMaterial = new BABYLON.SkyMaterial("skyboxMaterial", this.getScene());
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.inclination = 0;
        skyboxMaterial.luminance = 1;
        skyboxMaterial.turbidity = 20;

        this.skybox.material = skyboxMaterial;
    }

    public prepareOcean(size: number) {
        // Underwater ground
        let underwaterGround = BABYLON.Mesh.CreateGround(
            "underwaterGround",
            size,
            size,
            1,
            this.getScene(),
            false
        );

        underwaterGround.position.y = -this.oceanDepth;

        let underwaterGroundMaterial = new BABYLON.StandardMaterial("underwaterGroundMaterial", this.getScene());
        let underwaterGroundTexture = new BABYLON.Texture("static/textures/underwater_ground_diffuse.jpg", this.getScene());

        underwaterGroundTexture.uScale = underwaterGroundTexture.vScale = size / 64;

        underwaterGroundMaterial.diffuseTexture = underwaterGroundTexture;

        underwaterGround.material = underwaterGroundMaterial;

        // Water
        let water = BABYLON.Mesh.CreateGround(
            "water",
            size,
            size,
            size / 16,
            this.getScene(),
            false
        );
        let waterMaterial = new BABYLON.WaterMaterial("waterMaterial", this.getScene());
        let waterBumpTexture = new BABYLON.Texture("static/textures/water_bump.jpg", this.getScene());

        waterMaterial.bumpTexture = waterBumpTexture;
        waterMaterial.backFaceCulling = true;
        waterMaterial.windForce = 1;
        waterMaterial.waveHeight = 0.1;
        waterMaterial.waveLength = 0.1;
        waterMaterial.bumpHeight = 0.1;
        waterMaterial.windDirection = new BABYLON.Vector2(-1, 1);
        waterMaterial.waterColor = new BABYLON.Color3(0, 0, 221 / 255);
        waterMaterial.colorBlendFactor = 0.1;
        waterMaterial.addToRenderList(this.skybox);
        waterMaterial.addToRenderList(underwaterGround);

        water.material = waterMaterial;
    }

    public prepareGround(size: number) {
        let ground = BABYLON.Mesh.CreateGround(
            "ground",
            size,
            size,
            2,
            this.getScene()
        );
        ground.position.y = 1;

        let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.getScene());
        let groundTexture = new BABYLON.Texture("static/textures/ground_diffuse.jpg", this.getScene());

        groundTexture.uScale = groundTexture.vScale = size / 8;

        groundMaterial.diffuseTexture = groundTexture;

        ground.material = groundMaterial;
    }

    public prepareLights() {
        let hemiLight = new BABYLON.HemisphericLight(
            "hemiLight",
            new BABYLON.Vector3(0, 0, 0),
            this.getScene()
        );
        hemiLight.intensity = 0.7;
    }

}
