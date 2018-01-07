export class InputGamepad {

    public browserGamepad: Gamepad
    public type: InputGamepadTypeEnum = InputGamepadTypeEnum.Generic;

    // Buttons
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

    // Axes
    private _leftStickX: number = 0;
    private _leftStickY: number = 0;
    private _rightStickX: number = 0;
    private _rightStickY: number = 0;
    private _leftTrigger: number = 0;
    private _rightTrigger: number = 0;

    // Deadzones
    private _leftStickXDeadzone: number = 0.1;
    private _leftStickYDeadzone: number = 0.1;
    private _rightStickXDeadzone: number = 0.1;
    private _rightStickYDeadzone: number = 0.1;
    private _leftTriggerDeadzone: number = 0.1;
    private _rightTriggerDeadzone: number = 0.1;

    // Inverts
    private _leftStickYInvert: boolean = false;
    private _rightStickYInvert: boolean = false;

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
            this._leftStickX = this.browserGamepad.axes[0];
            this._leftStickY = this.browserGamepad.axes[1];
            this._rightStickX = this.browserGamepad.axes[3];
            this._rightStickY = this.browserGamepad.axes[4];
            this._leftTrigger = this.browserGamepad.axes[2];
            this._rightTrigger = this.browserGamepad.axes[5];

            this.buttonA = this.browserGamepad.buttons[0].pressed;
            this.buttonB = this.browserGamepad.buttons[1].pressed;
            this.buttonX = this.browserGamepad.buttons[2].pressed;
            this.buttonY = this.browserGamepad.buttons[3].pressed;
            this.buttonLB = this.browserGamepad.buttons[4].pressed;
            this.buttonRB = this.browserGamepad.buttons[5].pressed;
            this.buttonBack = this.browserGamepad.buttons[9].pressed;
            this.buttonStart = this.browserGamepad.buttons[8].pressed;
            this.buttonLeftStick = this.browserGamepad.buttons[6].pressed;
            this.buttonRightStick = this.browserGamepad.buttons[7].pressed;
            this.buttonDPadUp = this.browserGamepad.buttons[11].pressed;
            this.buttonDPadDown = this.browserGamepad.buttons[12].pressed;
            this.buttonDPadLeft = this.browserGamepad.buttons[13].pressed;
            this.buttonDPadRight = this.browserGamepad.buttons[14].pressed;
        } else {
            this._leftStickX = this.browserGamepad.axes[0];
            this._leftStickY = this.browserGamepad.axes[1];
            this._rightStickX = this.browserGamepad.axes[2];
            this._rightStickY = this.browserGamepad.axes[3];
            this._leftTrigger = this.browserGamepad.buttons[6].value;
            this._rightTrigger = this.browserGamepad.buttons[7].value;

            this.buttonA = this.browserGamepad.buttons[0].pressed;
            this.buttonB = this.browserGamepad.buttons[1].pressed;
            this.buttonX = this.browserGamepad.buttons[2].pressed;
            this.buttonY = this.browserGamepad.buttons[3].pressed;
            this.buttonLB = this.browserGamepad.buttons[4].pressed;
            this.buttonRB = this.browserGamepad.buttons[5].pressed;
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

    /********** Axes **********/

    public get leftStickX(): number {
        if (Math.abs(this._leftStickX) < this._leftStickXDeadzone) {
            return 0;
        }

        return this._leftStickX;
    };

    public get leftStickY(): number {
        if (Math.abs(this._leftStickY) < this._leftStickYDeadzone) {
            return 0;
        }

        return this._leftStickYInvert
            ? -this._leftStickY
            : this._leftStickY;
    };

    public get rightStickX(): number {
        if (Math.abs(this._rightStickX) < this._rightStickXDeadzone) {
            return 0;
        }

        return this._rightStickX;
    };

    public get rightStickY(): number {
        if (Math.abs(this._rightStickY) < this._rightStickYDeadzone) {
            return 0;
        }

        return this._rightStickYInvert
            ? -this._rightStickY
            : this._rightStickY;
    };

    public get leftTrigger(): number {
        if (Math.abs(this._leftTrigger) < this._leftTriggerDeadzone) {
            return 0;
        }

        return this._leftTrigger;
    };

    public get rightTrigger(): number {
        if (Math.abs(this._rightTrigger) < this._rightTriggerDeadzone) {
            return 0;
        }

        return this._rightTrigger;
    };

    public get triggers(): number {
        if (
            this.leftTrigger > 0 &&
            this.rightTrigger > 0
        ) {
            return this.rightTrigger - this.leftTrigger;
        } else if (
            this.leftTrigger > 0 &&
            this.rightTrigger === 0
        ) {
            return -this.leftTrigger;
        } else if (
            this.rightTrigger > 0 &&
            this.leftTrigger === 0
        ) {
            return this.rightTrigger;
        }

        return 0;
    };

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
    TriggerRight,
    Triggers
}

/**
 * Directly related to the InputGamepadAxisEnum enum and the InputGamepad class.
 */
export enum InputGamepadAxisPropertyEnum {
    StickLeftX = "leftStickX",
    StickLeftY = "leftStickY",
    StickRightX = "rightStickX",
    StickRightY = "rightStickY",
    TriggerLeft = "leftTrigger",
    TriggerRight  = "rightTrigger",
    Triggers  = "triggers" // A special, virtual field. If left trigger is pressed, the value is negative. If right trigger is pressed, it's positive.
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

/**
 * Directly related to the InputGamepadButtonEnum enum and the InputGamepad class.
 */
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
