/********** Interfaces **********/

export interface VehicleWheelParametersInterface {

    /**
     * The number of KG the vehicle has.
     *
     * @var number
     */
    mass: number;

    /**
     * What is the radius of the wheel?
     *
     * @var number
     */
    radius: number;

    /**
     * What is the width of the wheel?
     *
     * @var number
     */
    width: number;

    /**
     * How much health points dos that vehicle wheel has left?
     *
     * @var number
     */
    healthPoints: number;

    /**
     * What is the center of mass offset, in regards to the body center?
     *
     * @var BABYLON.Vector3
     */
    centerOfMassOffset: BABYLON.Vector3;

    /***** Suspension *****/

     /**
      * Also known as "contact depth". That is, how far the spring can be compressed at max?
      *
      * @var number
      */
     suspensionDistance: number;

     /**
      * @var number
      */
     suspensionSpringRate: number;

     /**
      * @var number
      */
     suspensionDamperRate: number;

     /**
      * @var number
      */
     suspensionChamberStiffness: number;

}

/********** Enums **********/

export interface VehicleWheelDataInterface {

    /**
     * How much health points does that vehicle wheel has left?
     *
     * @var number
     */
    healthPoints: number;

}

export enum VehicleWheelStatusEnum {
    Grounded,
    Airborne,
    Wheelspin
}
