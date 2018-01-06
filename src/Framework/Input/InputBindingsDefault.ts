import { Key as KeyboardKey } from 'ts-keycode-enum';

import {
    InputBindingsInterface,
    InputMappingInterface,
    InputDeviceEnum,
    InputDeviceAxisEnum,
    InputDeviceGamepadThumbstickEnum
} from '../Input';

export class InputBindingsDefault implements InputBindingsInterface {

    actions: { [key: string]: Array<InputMappingInterface> } = {
        jump: [
            {
                device: InputDeviceEnum.Keyboard,
                data: {
                    keyCode: KeyboardKey.Space,
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
                    thumbstick: InputDeviceGamepadThumbstickEnum.Right,
                    axis: InputDeviceAxisEnum.Y,
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
                    thumbstick: InputDeviceGamepadThumbstickEnum.Right,
                    axis: InputDeviceAxisEnum.X,
                    scale: 1.0,
                }
            },
        ],
        lookUp: [
            {
                device: InputDeviceEnum.Mouse,
                data: {
                    axis: InputDeviceAxisEnum.Y,
                    scale: 1.0,
                }
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    thumbstick: InputDeviceGamepadThumbstickEnum.Left,
                    axis: InputDeviceAxisEnum.Y,
                    scale: 1.0,
                }
            },
        ],
        lookRight: [
            {
                device: InputDeviceEnum.Mouse,
                data: {
                    axis: InputDeviceAxisEnum.X,
                    scale: 1.0,
                }
            },
            {
                device: InputDeviceEnum.Gamepad,
                data: {
                    thumbstick: InputDeviceGamepadThumbstickEnum.Left,
                    axis: InputDeviceAxisEnum.X,
                    scale: 1.0,
                }
            },
        ],
    };

}
