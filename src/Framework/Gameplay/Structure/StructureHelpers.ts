/******************** Enums ********************/

export enum StructureTypeEnum {
    Agricultural,
    Commercial,
    Residential,
    Medical,
    Educational,
    Government,
    Industrial,
    Military,
    ParkingAndStorage,
    Religious,
    Transport
}

// TODO: sub types (https://en.wikipedia.org/wiki/List_of_building_types)

/******************** Interfaces ********************/

export interface StructureParametersInterface {

    /**
     * How much health points does that structure have?
     *
     * @var number
     */
    healthPoints: number;

}

export interface StructureDataInterface {

    /**
     * How much health points does that structure have left?
     *
     * @var number
     */
    healthPoints: number;

}
