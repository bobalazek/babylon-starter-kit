import { UsableEntity } from '../UsableEntity';
import {
    StructureParametersInterface,
    StructureDataInterface,
    StructureTypeEnum
} from './StructureHelpers';

export class Structure {

    /**
     * What type is the structure?
     */
    private _type: StructureTypeEnum;

    /**
     * What sub-type is the structure?
     */
    private _subType: number; // TODO

    /**
     * Holds all the parameters data of that structure.
     */
    private _parameters: StructureParametersInterface;

    /**
     * Holds all the (real time) data of that structure.
     */
    private _data: StructureDataInterface;

}
