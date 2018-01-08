import { Key as KeyboardKey } from 'ts-keycode-enum';

import { InputMouseButtonEnum } from './InputMouse';
import {
    InputGamepadAxisEnum,
    InputGamepadButtonEnum
} from './InputGamepad';

/********** Bindings **********/

export class AbstractInputBindings {
    axes: { [key: string]: Array<InputMappingInterface> } = {};
    actions: { [key: string]: Array<InputMappingInterface> } = {};
}

export interface InputBindingsInterface {
    axes: { [key: string]: Array<InputMappingInterface> };
    actions: { [key: string]: Array<InputMappingInterface> };
}

/********** Mapping **********/

export interface InputMappingInterface {
    device: InputDeviceEnum;
    data: any;
}

export interface InputMappingAxisKeyboardDataInterface {
    keyCode: KeyboardKey;
    scale: number;
}

export interface InputMappingAxisGamepadDataInterface {
    axis: InputGamepadAxisEnum;
    scale: number;
}

export interface InputMappingAxisMouseDataInterface {
    axis: InputAxisEnum;
    scale: number;
}

export interface InputMappingActionKeyboardDataInterface {
    keyCode: KeyboardKey;
}

export interface InputMappingActionMouseDataInterface {
    button: InputMouseButtonEnum;
}

export interface InputMappingActionGamepadDataInterface {
    button: InputGamepadButtonEnum;
}

/********** Enums **********/

export enum InputAxisEnum {
    X,
    Y
}

export enum InputModeEnum {
    KeyboardAndMouse,
    Gamepad,
    VR
}

export enum InputDeviceEnum {
    Keyboard,
    Mouse,
    Gamepad,
    Touch,
    DeviceOrientation
}
