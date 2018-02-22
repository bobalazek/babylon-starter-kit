import { GameManager } from '../../Core/GameManager';
import { PossessableEntity } from '../PossessableEntity';

/**
 * This class will control an Possessable object/entity.
 */
export class AbstractController {

    public inputEnabledOnlyOnPointerLock: boolean = true; // should we update & proess the input only only when pointer is locked?

    /**
     * Which entity should we control?
     */
    private _possessableEntity: PossessableEntity;

    private _locationInput: BABYLON.Vector3;
    private _rotationInput: BABYLON.Vector3;

    public start () {

        this._possessableEntity = GameManager.activeLevel.getPlayer();

        GameManager.engine.runRenderLoop(() => {
            if (
                this.inputEnabledOnlyOnPointerLock &&
                GameManager.engine.isPointerLock
            ) {
                this.update();
                this._processInput();
            }
        });

    }

    public update () {
        // this will run on every loop, before the possessable entity will get updated
    }

    public setLocationInput(locationInput: BABYLON.Vector3) {
        this._locationInput = locationInput;
    }

    public setRotationInput(rotationInput: BABYLON.Vector3) {
        this._rotationInput = rotationInput;
    }

    public getPossessableEntity() {
        return this._possessableEntity;
    }

    private _processInput() {

        if (this._possessableEntity) {
            const physicsBody = this._possessableEntity.getMesh().physicsImpostor;
            if (this._locationInput !== BABYLON.Vector3.Zero()) {
                physicsBody.applyForce(
                    this._locationInput,
                    physicsBody.getObjectCenter()
                );
            }
        }

    }

}
