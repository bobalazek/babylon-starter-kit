import { GameManager } from "../../Framework/GameManager";
import { AbstractBaseScene } from './AbstractBaseScene';

export class HelloWorldLevel extends AbstractBaseScene {

    public start() {

        super.start();

        let camera = new BABYLON.UniversalCamera(
            "spectatorCamera",
            new BABYLON.Vector3(0, 8, 0),
            this.getScene()
        );
        camera.attachControl(
            GameManager.canvas,
            false
        );

    }

}
