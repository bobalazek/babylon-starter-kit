import { Key as KeyboardKey } from 'ts-keycode-enum';

import {
    InputAxisEnum,
    InputDeviceEnum,
    InputMappingInterface,
    AbstractInputBindings
} from '../InputHelpers';
import {
    InputGamepadAxisEnum,
    InputGamepadButtonEnum
} from '../../Input/InputGamepad';
import {
    InputMouseButtonEnum
} from '../../Input/InputMouse';

export class InputBindingsDefault extends AbstractInputBindings {

    axes: { [key: string]: Array<InputMappingInterface> } = {
        moveForward: [
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.UpArrow,
                    scale: 1.0,
                },
            },
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.W,
                    scale: 1.0,
                },
            },
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.DownArrow,
                    scale: -1.0,
                },
            },
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.S,
                    scale: -1.0,
                },
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    axis: InputGamepadAxisEnum.StickLeftY,
                    scale: 1.0,
                }
            },
        ],
        moveRight: [
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.LeftArrow,
                    scale: -1.0,
                },
            },
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.A,
                    scale: -1.0,
                },
            },
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.RightArrow,
                    scale: 1.0,
                },
            },
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.D,
                    scale: 1.0,
                },
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    axis: InputGamepadAxisEnum.StickLeftX,
                    scale: 1.0,
                }
            },
        ],
        lookUp: [
            {
                device: InputDeviceEnum.Mouse,
                data: {
                    axis: InputAxisEnum.Y,
                    scale: 1.0,
                }
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    axis: InputGamepadAxisEnum.StickRightY,
                    scale: 1.0,
                }
            },
        ],
        lookRight: [
            {
                device: InputDeviceEnum.Mouse,
                data: {
                    axis: InputAxisEnum.X,
                    scale: 1.0,
                }
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    axis: InputGamepadAxisEnum.StickRightX,
                    scale: 1.0,
                }
            },
        ],
    };

    actions: { [key: string]: Array<InputMappingInterface> } = {
        jump: [
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.Space,
                },
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    button: InputGamepadButtonEnum.B,
                },
            },
        ],
        interact: [
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.F,
                },
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    button: InputGamepadButtonEnum.A,
                },
            },
            {
                device: InputDeviceEnum.Mouse,
                data: {
                    button: InputMouseButtonEnum.Left,
                },
            },
        ],
    };

}
