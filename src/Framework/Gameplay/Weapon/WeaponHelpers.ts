/******************** Enums ********************/

export enum WeaponTypeEnum {
    Firearm,
    Melee,
    Ranged,
    Throwable,
    NonLethal,
    Shield
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
    Knive,
    Spear,
    Sword,
    Whip
}

export enum WeaponRangedTypeEnum {
    Bow,
    Cannon,
    Crossbow,
    Energy, // DEW or Magnetic
    Missile,
    Nuclear,
    Rocket,
    Sling
}

export enum WeaponThrowableTypeEnum {
    Grenade,
    Shuriken
}

export enum WeaponNonLethalTypeEnum {
    Water,
    PepperSpray,
    Electroshock,
    LRAD // Long Range Acoustic Device
}

/******************** Interfaces ********************/

export interface WeaponParametersInterface {

    /**
     * How much damage points will that weapon do?
     *
     * @var number
     */
    damagePoints: number;

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

    /**
     * How far does the weapon reach (for ranged weapons)?
     *
     * @var number
     */
    range: number;

    /**
     * What is the explosion radius for that weapon?
     *
     * @var number
     */
    explosionRadius: number;

}

export interface WeaponDataInterface {

    /**
     * How much ammunition do we have left?
     *
     * @var number
     */
    ammunition: number;

}
