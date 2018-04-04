/********** Enums **********/

export enum CharacterStatusEnum {
    Idle,
    Walking,
    Running,
    Crouching,
    Swimming,
    Jumping,
    Falling,
    Sliding,
    Standing,
    Aiming,
    Shooting,
    Throwing,
    Attacking,
    Defending,
    Driving,
    Flying,
    Riding,
    Sailing, // Rowing? Steering?
    EnteringVehicle,
    InVehicle,
    ExitingVehicle,
    Seated,
    Crouched,
    Grounded,
    Drowned,
    Airborne,
    Ragdoll
}

export enum CharacterPredationModeEnum {
    None,
    Predator,
    Prey
}

/******************** Interfaces ********************/

export interface CharacterParametersInterface {

    /**
     * How much health/hit/damage points does that character have?
     *
     * @var number
     */
    healthPoints: number;

    /**
     * How much armor points does that character have?
     *
     * @var number
     */
    armorPoints: number;

}

export interface CharacterDataInterface {

    /**
     * How much health/hit/damage points does that character have left?
     *
     * @var number
     */
    healthPoints: number;

    /**
     * How much armor points does that character have left?
     *
     * @var number
     */
    armorPoints: number;

    /**
     * How much experience points does that character have?
     *
     * @var number
     */
    experiencePoints: number;

    /**
     * At which level is that character?
     *
     * @var number
     */
    level: number;

}
