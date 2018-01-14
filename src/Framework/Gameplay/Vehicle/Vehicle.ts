import { PossessableEntity } from '../PossessableEntity';
import {
    VehicleTypeEnum,
    VehicleAircraftTypeEnum,
    VehicleLandcraftTypeEnum,
    VehicleWatercraftTypeEnum,
    VehicleStatusEnum
} from './VehicleHelpers';
import {
    VehicleParametersInterface,
    VehicleDataInterface,
    VehicleInputInterface
} from './VehicleInterfaces';

export class Vehicle extends PossessableEntity {

    /**
     * What type is the vehicle?
     */
    public type: VehicleTypeEnum;

    /**
     * What sub-type is the vehicle?
     */
    public subType: VehicleAircraftTypeEnum | VehicleLandcraftTypeEnum | VehicleWatercraftTypeEnum;

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
