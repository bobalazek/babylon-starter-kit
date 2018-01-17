import { GameManager } from "../Framework/Core/GameManager";
import { AbstractController } from '../Framework/Gameplay/Controller/AbstractController';

export class PlayerController extends AbstractController {

    public update () {
        let locationInput = BABYLON.Vector3.Zero();
        let rotationInput = BABYLON.Vector3.Zero();

        const inputAxes = GameManager.inputManager.getAxes();

        if (inputAxes['moveForward'] !== 0) {
            locationInput.addInPlace(new BABYLON.Vector3(0, 0, inputAxes['moveForward'] * 50));
        }

        if (inputAxes['moveRight'] !== 0) {
            locationInput.addInPlace(new BABYLON.Vector3(inputAxes['moveRight'] * 50, 0, 0));
        }

        this.setLocationInput(locationInput);
        this.setRotationInput(rotationInput);
    }

}
