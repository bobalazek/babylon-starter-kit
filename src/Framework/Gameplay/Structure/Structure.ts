import { UsableEntity } from '../UsableEntity';
import {
    StructureParametersInterface,
    StructureDataInterface,
    StructureTypeEnum,
    StructureAgriculturalTypeEnum,
    StructureCommercialTypeEnum,
    StructureResidentialTypeEnum,
    StructureMedicalTypeEnum,
    StructureEducationalTypeEnum,
    StructureGovernmentTypeEnum,
    StructureIndustrialTypeEnum,
    StructureMilitaryTypeEnum,
    StructureParkingAndStorageTypeEnum,
    StructureReligiousTypeEnum,
    StructureTransportTypeEnum,
    StructureStatusEnum
} from './StructureHelpers';

export class Structure {

    /**
     * What type is the structure?
     */
    private _type: StructureTypeEnum;

    /**
     * What sub-type is the structure?
     */
    private _subType: StructureAgriculturalTypeEnum
        | StructureCommercialTypeEnum
        | StructureResidentialTypeEnum
        | StructureMedicalTypeEnum
        | StructureEducationalTypeEnum
        | StructureGovernmentTypeEnum
        | StructureIndustrialTypeEnum
        | StructureMilitaryTypeEnum
        | StructureParkingAndStorageTypeEnum
        | StructureReligiousTypeEnum
        | StructureTransportTypeEnum;

    /**
     * Holds all the parameters data of that structure.
     */
    private _parameters: StructureParametersInterface;

    /**
     * Holds all the (real time) data of that structure.
     */
    private _data: StructureDataInterface;

    /**
     * Holds all the structure statuses.
     */
    private _statuses: Array<StructureStatusEnum>;

}
