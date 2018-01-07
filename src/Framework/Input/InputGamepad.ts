export class InputGamepad {

    public browserGamepad: Gamepad
    public type: InputGamepadTypeEnum = InputGamepadTypeEnum.Generic;

    public leftStickX: number = 0;
    public leftStickY: number = 0;
    public rightStickX: number = 0;
    public rightStickY: number = 0;
    public leftTrigger: number = 0;
    public rightTrigger: number = 0;

    public buttonA: boolean = false;
    public buttonB: boolean = false;
    public buttonX: boolean = false;
    public buttonY: boolean = false;
    public buttonStart: boolean = false;
    public buttonBack: boolean = false;
    public buttonLeftStick: boolean = false;
    public buttonRightStick: boolean = false;
    public buttonLB: boolean = false;
    public buttonRB: boolean = false;
    public buttonLT: boolean = false;
    public buttonRT: boolean = false;
    public buttonDPadUp: boolean = false;
    public buttonDPadDown: boolean = false;
    public buttonDPadLeft: boolean = false;
    public buttonDPadRight: boolean = false;

    constructor (browserGamepad: Gamepad) {

        this.browserGamepad = browserGamepad;

        const isXbox = (<string>this.browserGamepad.id).search("Xbox") !== -1;
        const isXboxOne = (<string>this.browserGamepad.id).search("Xbox One") !== -1;
        if (isXbox) {
            this.type = isXboxOne
                ? InputGamepadTypeEnum.XboxOne
                : InputGamepadTypeEnum.Xbox360;
        }

    }

    public update() {

        if (this.type === InputGamepadTypeEnum.XboxOne) {
            // TODO: not really sure for that one
            this.leftStickX = this.browserGamepad.axes[0];
            this.leftStickY = this.browserGamepad.axes[1];
            this.rightStickX = this.browserGamepad.axes[3];
            this.rightStickY = this.browserGamepad.axes[4];
            this.buttonA = this.browserGamepad.buttons[0].pressed;
            this.buttonB = this.browserGamepad.buttons[1].pressed;
            this.buttonX = this.browserGamepad.buttons[2].pressed;
            this.buttonY = this.browserGamepad.buttons[3].pressed;
            this.buttonLB = this.browserGamepad.buttons[4].pressed;
            this.buttonRB = this.browserGamepad.buttons[5].pressed;
            this.leftTrigger = this.browserGamepad.axes[2];
            this.rightTrigger = this.browserGamepad.axes[5];
            this.buttonBack = this.browserGamepad.buttons[9].pressed;
            this.buttonStart = this.browserGamepad.buttons[8].pressed;
            this.buttonLeftStick = this.browserGamepad.buttons[6].pressed;
            this.buttonRightStick = this.browserGamepad.buttons[7].pressed;
            this.buttonDPadUp = this.browserGamepad.buttons[11].pressed;
            this.buttonDPadDown = this.browserGamepad.buttons[12].pressed;
            this.buttonDPadLeft = this.browserGamepad.buttons[13].pressed;
            this.buttonDPadRight = this.browserGamepad.buttons[14].pressed;
        } else {
            this.leftStickX = this.browserGamepad.axes[0];
            this.leftStickY = this.browserGamepad.axes[1];
            this.rightStickX = this.browserGamepad.axes[2];
            this.rightStickY = this.browserGamepad.axes[3];
            this.buttonA = this.browserGamepad.buttons[0].pressed;
            this.buttonB = this.browserGamepad.buttons[1].pressed;
            this.buttonX = this.browserGamepad.buttons[2].pressed;
            this.buttonY = this.browserGamepad.buttons[3].pressed;
            this.buttonLB = this.browserGamepad.buttons[4].pressed;
            this.buttonRB = this.browserGamepad.buttons[5].pressed;
            this.leftTrigger = this.browserGamepad.buttons[6].value;
            this.rightTrigger = this.browserGamepad.buttons[7].value;
            this.buttonBack = this.browserGamepad.buttons[8].pressed;
            this.buttonStart = this.browserGamepad.buttons[9].pressed;
            this.buttonLeftStick = this.browserGamepad.buttons[10].pressed;
            this.buttonRightStick = this.browserGamepad.buttons[11].pressed;
            this.buttonDPadUp = this.browserGamepad.buttons[12].pressed;
            this.buttonDPadDown = this.browserGamepad.buttons[13].pressed;
            this.buttonDPadLeft = this.browserGamepad.buttons[14].pressed;
            this.buttonDPadRight = this.browserGamepad.buttons[15].pressed;
        }

    }

}

export interface InputEnumStickValues {
    x: number;
    y: number;
}

export enum InputGamepadTypeEnum {
    Generic,
    Xbox360,
    XboxOne
}

export enum InputGamepadAxisEnum {
    StickLeftX,
    StickLeftY,
    StickRightX,
    StickRightY,
    TriggerLeft,
    TriggerRight
}

export enum InputGamepadAxisPropertyEnum {
    StickLeftX = "leftStickX",
    StickLeftY = "leftStickY",
    StickRightX = "rightStickX",
    StickRightY = "rightStickY",
    TriggerLeft = "leftTrigger",
    TriggerRight  = "rightTrigger"
}

export enum InputGamepadButtonEnum {
    A,
    B,
    X,
    Y,
    Start,
    Back,
    StickLeft,
    StickRight,
    LB,
    RB,
    LT,
    RT,
    DPadUp,
    DPadDown,
    DPadLeft,
    DPadRight
}

export enum InputGamepadButtonPropertyEnum {
    A = "buttonA",
    B = "buttonB",
    X = "buttonX",
    Y = "buttonY",
    Start = "buttonStart",
    Back = "buttonBack",
    StickLeft = "buttonLeftStick",
    StickRight = "buttonRightStick",
    LB = "buttonLB",
    RB = "buttonRB",
    LT = "leftTrigger",
    RT = "rightTrigger",
    DPadUp = "buttonDPadUp",
    DPadDown = "buttonDPadDown",
    DPadLeft = "buttonDPadLeft",
    DPadRight = "buttonDPadRight",
}
