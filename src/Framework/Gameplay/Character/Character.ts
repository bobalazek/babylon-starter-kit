import { PossessableEntity } from '../PossessableEntity';
import {
    CharacterStatusEnum,
    CharacterPredationModeEnum
} from './CharacterHelpers';

export class PlayerCharacter extends PossessableEntity {

    /**
     * Holds all the character statuses.
     */
    private _statuses: Array<CharacterStatusEnum>;

    /**
     * What is the predation mode of that character?
     */
    private _predationMode: Array<CharacterPredationModeEnum>;

}
