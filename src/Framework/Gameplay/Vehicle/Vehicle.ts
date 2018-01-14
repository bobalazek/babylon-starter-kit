import { PossessableEntity } from '../PossessableEntity';
import {
    VehicleParametersInterface,
    VehicleDataInterface,
    VehicleInputInterface,
    VehicleTypeEnum,
    VehicleAircraftTypeEnum,
    VehicleLandcraftTypeEnum,
    VehicleWatercraftTypeEnum,
    VehicleStatusEnum,
    VehicleEngineEnum
} from './VehicleHelpers';

export class Vehicle extends PossessableEntity {

    /**
     * What type is the vehicle?
     */
    private _type: VehicleTypeEnum;

    /**
     * What sub-type is the vehicle?
     */
    private _subType: VehicleAircraftTypeEnum | VehicleLandcraftTypeEnum | VehicleWatercraftTypeEnum;

    /**
     * The vehicle engine type?
     */
    private _engineType: VehicleEngineEnum;

    /**
     * Holds all the parameters data of that vehicle.
     */
    private _parameters: VehicleParametersInterface;

    /**
     * Holds all the (real time) data of that vehicle.
     */
    private _data: VehicleDataInterface;

    /**
     * Holds all the input data of that vehicle.
     */
    private _input: VehicleInputInterface;

    /**
     * Holds all the vehicle statuses.
     */
    private _statuses: Array<VehicleStatusEnum>;

    public update() {
        // TODO
    }

}
