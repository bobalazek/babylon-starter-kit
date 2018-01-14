/******************** Enums ********************/

export enum WeaponTypeEnum {
    Firearm,
    Melee,
    Ranged,
    Throwable,
    Rocket,
    Cannon,
    Nuclear
}

export enum WeaponFirearmTypeEnum {
    GrenadeLauncher,
    MachineGun,
    Pistol,
    RecoillessGun,
    Rifle,
    Shotgun
}

export enum WeaponMeleeTypeEnum {
    Axe,
    Sword
}

export enum WeaponRangedTypeEnum {
    Bow,
    Crossbow
}

export enum WeaponThrowableTypeEnum {
    Grenade
}

export interface WeaponParametersInterface {

    /**
     * How much damage points will that weapon do?
     *
     * @var number
     */
    damage: number;

    /**
     * @var number
     */
    ammunitionCapacity: number;

    /**
     * @var number
     */
    ammunitionCapacityPerRound: number;

    /**
     * @var number
     */
    recoilForce: number;

}

export interface WeaponDataInterface {

    /**
     * How much ammunition do we have left?
     *
     * @var number
     */
    ammunition: number;

}
