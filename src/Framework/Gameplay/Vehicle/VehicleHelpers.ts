/********** Interfaces **********/

export interface VehicleParametersInterface {

    /********** General **********/

    /**
     * The number of KG the vehicle has.
     *
     * @var number
     */
    mass: number;

    /**
     * What is the center of mass offset, of the vehicle?
     *
     * @var BABYLON.Vector3
     */
    centerOfMassOffset: BABYLON.Vector3;

    /**
     * @var BABYLON.Vector3
     */
    inertiaMultiplier: BABYLON.Vector3;

    /**
     * To simulate aerodynamic/hydrodynamic drag.
     *
     * @var number
     */
    dragCoefficient: number;

    /**
     * How many percent of the vehicle needs to be under water, before it will start to drown/submerge?
     *
     * @var number
     */
    submersionHeightPercentage: number;

    /**
     * How much health points does that vehicle have?
     *
     * @var number
     */
    healthPoints: number;

    /********** Engine **********/

    /**
     * What is the max speed of the vehicle a.k.a. max velocity?
     *
     * @var number
     */
    speed: number;

    /**
     * How fast will the vehicle accelerate?
     *
     * @var number
     */
    acceleration: number;

    /**
     * How fast will the acceleration decline to idle, after we release the thrust?
     *
     * @var number
     */
    accelerationFalloff: number;

    /**
     * How many gears does that vehicle have? EXCLUDING the neutral & reverse gears.
     *
     * @var number
     */
    numberOfGears: number;

    /********** Steering **********/

    /**
     * Also known as "steering lock". What is the maximum steering angle in degrees?
     *
     * @var number
     */
    steeringAngle: number;

    /**
     * How fast can we move left & right (also applies for cars)?
     *
     * @var number
     */
    steeringYawMultiplier: number;

    /**
     * How fast will the yaw get stabilized after releasing it?
     *
     * @var number
     */
    steeringYawStablilize: number;

    /**
     * How fast can we move up & down?
     *
     * @var number
     */
    steeringPitchMultiplier: number;

    /**
     * How fast will the pitch get stabilized after releasing it?
     *
     * @var number
     */
    steeringPitchStablilize: number;

    /**
     * How fast can we roll?
     *
     * @var number
     */
    steeringRollMultiplier: number;

    /**
     * How fast will the roll get stabilized after releasing it?
     *
     * @var number
     */
    steeringRollStablilize: number;

    /********** Braking **********/

    /**
     * The bigger the number, the harder the breaking.
     *
     * @var number
     */
    brakeForce: number;

    /**
     * Values from 0 to 1. 0 meaning all the brake force is on the front wheels, and 1 on the back.
     *
     * @var number
     */
    brakeBiasFront: number;

    /********** Handling **********/

    /**
     * How much control we we have over the vehicle, if it is on the ground?
     *
     * @var number
     */
    handlingGroundControlMultiplier: number;

    /**
     * How much control we we have over the vehicle, if it is in the air?
     *
     * @var number
     */
    handlingAirControlMultiplier: number;

    /**
     * How much control we we have over the vehicle, if it is in the water?
     *
     * @var number
     */
    handlingWaterControlMultiplier: number;

    /********** Landcraft **********/

    /**
     * The bigger the number, the harder the breaking.
     *
     * @var number
     */
    handBrakeForce: number;

    /********** Watercraft **********/

    /**
     * https://en.wikipedia.org/wiki/Aquaplaning
     *
     * @var number
     */
    aquaplaneForce: number;

    /**
     * https://www.marineinsight.com/naval-architecture/rudder-ship-turning/
     *
     * @var number
     */
    rudderForce: number;

}

export interface VehicleDataInterface {

    /**
     * How much health points dos that vehicle has left?
     *
     * @var number
     */
    healthPoints: number;

    /**
     * What is the current vehicles gear?
     * -1 = reverse
     * 0 = neutral
     * 1 = 1st
     * 2 = 2nd
     * ...
     *
     * @var number
     */
    gear: number;

}

export interface VehicleInputInterface {

    /**
     * Values from 0 to 1
     *
     * @var number
     */
    throttle: number;

    /**
     * Values from 0 to 1
     *
     * @var number
     */
    brake: number;

    /**
     * A.k.a. steer (left & right). Values from -1 to 1
     *
     * @var number
     */
    yaw: number;

    /**
     * Values from -1 to 1
     *
     * @var number
     */
    pitch: number;

    /**
     * Values from -1 to 1
     *
     * @var number
     */
    roll: number;

}

export interface VehicleWheelParametersInterface {

    /**
     * The number of KG the vehicle has.
     *
     * @var number
     */
    mass: number;

}

/********** Enums **********/

export enum VehicleTypeEnum {
    Aircraft,
    Landcraft,
    Watercraft
}

export enum VehicleAircraftTypeEnum {
    Aeroplane,
    Airship,
    Autogyro,
    Glider,
    HangGlider,
    Helicopter,
    HotAirBalloon,
    Hydrofoil,
    Rotorcraft,
    Seaplane,
    Spaceplane
}

export enum VehicleLandcraftTypeEnum {
    Bike,
    Bulldozer,
    Bus,
    Car,
    Motorcycle,
    Snowmobile,
    Tank,
    Train,
    Truck
}

export enum VehicleWatercraftTypeEnum {
    Amphibian,
    Boat,
    Catamaran,
    MerchantShip,
    Hovercraft,
    Hydroplane,
    Motorboat,
    Sailboat,
    Submarine,
    Tanker,
    Trimaran,
    Yacht
}

export enum VehicleEngineEnum {
    InternalCombustionEngine, // cars & co.
    PumpjetEngine, // boats & ships
    RocketEngine // planes & rockets
}

export enum VehicleSteeringEnum {
    FrontWheelSteering,
    RearWheelSteering,
    FourWheelSteering,
    RudderSteering, // boats & ships
    DifferentialSteering, // tanks & co.
    CounterSteering, // 2-wheel vehicles (cycles & bikes)
    AileronSteering // planes
}

export enum VehicleStatusEnum {
    Idle,
    Accelerating,
    Decelerating,
    HandBraking,
    Grounded,
    Airborne,
    Submerging,
    Submerged,
    Slipping // drifting
}


export enum VehicleWheelStatusEnum {
    Grounded,
    Airborne,
    Wheelspin
}
