import { UsableEntity } from '../UsableEntity';
import {
    WeaponParametersInterface,
    WeaponDataInterface,
    WeaponTypeEnum,
    WeaponFirearmTypeEnum,
    WeaponMeleeTypeEnum,
    WeaponRangedTypeEnum,
    WeaponThrowableTypeEnum
} from './WeaponHelpers';

export class Weapon extends UsableEntity {

    /**
     * What type is the weapon?
     */
    private _type: WeaponTypeEnum;

    /**
     * What sub-type is the weapon?
     */
    private _subType: WeaponFirearmTypeEnum | WeaponMeleeTypeEnum | WeaponRangedTypeEnum | WeaponThrowableTypeEnum;

    /**
     * Holds all the parameters data of that weapon.
     */
    private _parameters: WeaponParametersInterface;

    /**
     * Holds all the (real time) data of that weapon.
     */
    private _data: WeaponDataInterface;

}
