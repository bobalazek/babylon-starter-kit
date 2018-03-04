import { PossessableEntity } from '../PossessableEntity';
import {
    CharacterParametersInterface,
    CharacterDataInterface,
    CharacterStatusEnum,
    CharacterPredationModeEnum
} from './CharacterHelpers';

export class Character extends PossessableEntity {

    /**
     * Holds all the parameters data of that character.
     */
    private _parameters: CharacterParametersInterface;

    /**
     * Holds all the (real time) data of that character.
     */
    private _data: CharacterDataInterface;

    /**
     * Holds all the character statuses.
     */
    private _statuses: Array<CharacterStatusEnum>;

    /**
     * What is the predation mode of that character?
     */
    private _predationMode: Array<CharacterPredationModeEnum>;

}
