/********** Enums **********/

export enum CharacterStatusEnum {
    Idle,
    Walking,
    Running,
    Crouching,
    Swimming,
    Jumping,
    Falling,
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
     * How much health points does that character have?
     *
     * @var number
     */
    healthPoints: number;

}

export interface CharacterDataInterface {

    /**
     * How much health points does that character have left?
     *
     * @var number
     */
    healthPoints: number;

}
