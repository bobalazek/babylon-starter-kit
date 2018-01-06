import * as BABYLON from 'babylonjs';

import { GameManager } from "../../Framework/GameManager";
import { AbstractBaseScene } from './AbstractBaseScene';

export class HelloWorldLevel extends AbstractBaseScene {

    public start() {

        super.start();

        let camera = new BABYLON.UniversalCamera(
            "firstPersonCamera",
            new BABYLON.Vector3(0, 36, 0),
            this.getScene()
        );
        camera.attachControl(
            GameManager.canvas,
            false
        );

    }

}
