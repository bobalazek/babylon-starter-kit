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
