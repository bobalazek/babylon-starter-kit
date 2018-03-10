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

    public start () {

        this._possessableEntity = GameManager.activeLevel.getPlayer();

        GameManager.engine.runRenderLoop(() => {
            if (
                this.inputEnabledOnlyOnPointerLock &&
                GameManager.engine.isPointerLock
            ) {
                this.update();
            }
        });

    }

    public update () {
        // this will run on every loop, before the possessable entity will get updated
    }

    public getPossessableEntity() {
        return this._possessableEntity;
    }

}
