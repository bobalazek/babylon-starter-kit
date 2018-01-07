import { Key as KeyboardKey } from 'ts-keycode-enum';

import {
    InputBindingsInterface,
    InputMappingInterface,
    InputDeviceEnum
} from '../../Input';
import {
    InputGamepadAxisEnum,
    InputGamepadButtonEnum,
    InputGamepadThumbstickEnum
} from '../../Input/InputGamepad';

export class InputBindingsDefault implements InputBindingsInterface {

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
        ],
    };

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
                    thumbstick: InputGamepadThumbstickEnum.Right,
                    axis: InputGamepadAxisEnum.Y,
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
                    thumbstick: InputGamepadThumbstickEnum.Right,
                    axis: InputGamepadAxisEnum.X,
                    scale: 1.0,
                }
            },
        ],
        lookUp: [
            {
                device: InputDeviceEnum.Mouse,
                data: {
                    axis: InputGamepadAxisEnum.Y,
                    scale: 1.0,
                }
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    thumbstick: InputGamepadThumbstickEnum.Left,
                    axis: InputGamepadAxisEnum.Y,
                    scale: 1.0,
                }
            },
        ],
        lookRight: [
            {
                device: InputDeviceEnum.Mouse,
                data: {
                    axis: InputGamepadAxisEnum.X,
                    scale: 1.0,
                }
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    thumbstick: InputGamepadThumbstickEnum.Left,
                    axis: InputGamepadAxisEnum.X,
                    scale: 1.0,
                }
            },
        ],
    };

}
