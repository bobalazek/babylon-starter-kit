import { GameManager } from '../../Core/GameManager';
import { PossessableEntity } from '../PossessableEntity';

/**
 * This class will control an Possessable object/entity.
 */
export class Controller {

    /**
     * Which entity should we control?
     */
    private _possessableEntity: PossessableEntity;

    public constructor () {
        GameManager.engine.runRenderLoop(() => {
            // TODO: process input and move the entity/object
        });
    }

}
