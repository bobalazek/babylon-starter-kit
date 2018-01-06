import * as BABYLON from 'babylonjs';
import 'babylonjs-materials';

import { AbstractLevel } from '../../Framework/AbstractLevel';

export class AbstractBaseScene extends AbstractLevel {

    public skybox: BABYLON.Mesh;

    public worldSize: number = 4096;
    public spawnPoint: BABYLON.Vector3 = new BABYLON.Vector3(0, 36, 0);

    public start() {

        // Skybox
        this.prepareSkybox(this.worldSize);

        // Ground
        this.prepareGround(this.worldSize / 4);

        // Lights
        this.prepareLights();

    }

    public prepareSkybox(size) {
        this.skybox = BABYLON.Mesh.CreateBox("skybox", size, this.getScene());
        this.skybox.infiniteDistance = true;

        let skyboxMaterial = new BABYLON.SkyMaterial("skyboxMaterial", this.getScene());
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.inclination = 0;
        skyboxMaterial.luminance = 1;
        skyboxMaterial.turbidity = 20;

        this.skybox.material = skyboxMaterial;
    }

    public prepareGround(size) {
        let ground = BABYLON.Mesh.CreateGround(
            "ground",
            size,
            size,
            2,
            this.getScene()
        );
        ground.position.y = 32;

        let groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.getScene());
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
