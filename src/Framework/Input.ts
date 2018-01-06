import { GameManager } from './GameManager';

export class InputManager {

    private _inputMode: InputModeEnum = InputModeEnum.KeyboardAndMouse;

    // Keyboard stuff
    private _keyboardKeyActionsMap: { [key: number]: string };
    private _keyboardKeysPressed: { [key: number]: string };
    private _keyboardKeysPressedOnce: { [key: number]: string }; // will only output the value only on the subsequent frame. Then it will be reset to 0 again

    // Mouse staff
    private _mouseActionAxisMap: { [key: number]: any };
    private _mouseInterval: any; // TODO: correct type for setInterval?
    private _mouseIntervalTime: number = 50; // after how many miliseconds it should clear the values?

    // Gamepad stuff
    private _isGamepadConnected: boolean = false;

    // Axes & actions
    private _axes: { [key: string]: number };
    private _actions: { [key: string]: boolean };

    constructor(private _bindings: InputBindingsInterface) {

        // Populate the axes & actions
        for (let key in this._bindings.axes) {
            this._axes[key] = 0.0;

            // Mouse action-axis map
            const mappings = this._bindings.axes[key];
            for (let i = 0; i < mappings.length; i++) {
                if (mappings[i].device !== InputDeviceEnum.Mouse) {
                    continue;
                }

                this._mouseActionAxisMap[key] = mappings[i].data;
            }
        }
        for (let key in this._bindings.actions) {
            this._actions[key] = false;

            // Keyboard key-actions map
            const mappings = this._bindings.actions[key];
            for (let i = 0; i < mappings.length; i++) {
                if (mappings[i].device !== InputDeviceEnum.Keyboard) {
                    continue;
                }

                this._keyboardKeyActionsMap[mappings[i].data.keyCode] = key;
            }
        }

    }

    /********** General **********/

    public watch() {

        const canvas = GameManager.engine.getRenderingCanvas();

        // Keyboard events
        canvas.addEventListener(
            "keydown",
            this.handleKeyboardInputEvent.bind(this),
            false
        );
        canvas.addEventListener(
            "keyup",
            this.handleKeyboardInputEvent.bind(this),
            false
        );

        // Mouse events
        canvas.addEventListener(
            "mousemove",
            this.handleMouseInputEvent.bind(this),
            false
        );

        // Gamepad events
        window.addEventListener(
            "gamepadconnected",
            this.handleGamepadConnectedEvent.bind(this),
            false
        );
        window.addEventListener(
            "gamepaddisconnected",
            this.handleGamepadDisconnectedEvent.bind(this),
            false
        );

    }

    public unwatch() {

        const canvas = GameManager.engine.getRenderingCanvas();

        // Keyboard events
        canvas.removeEventListener(
            "keydown",
            this.handleKeyboardInputEvent.bind(this),
            false
        );
        canvas.removeEventListener(
            "keyup",
            this.handleKeyboardInputEvent.bind(this),
            false
        );

        // Mouse events
        canvas.removeEventListener(
            "mousemove",
            this.handleMouseInputEvent.bind(this),
            false
        );

        // Gamepad events
        window.removeEventListener(
            "gamepadconnected",
            this.handleGamepadConnectedEvent.bind(this),
            false
        );
        window.removeEventListener(
            "gamepaddisconnected",
            this.handleGamepadDisconnectedEvent.bind(this),
            false
        );

    }

    public update() {

        // TODO: mainly for updating the gamepad

    }

    /***** Axes & Actions *****/

    public getAxes(axis?: string) {

        if (axis) {
            if (typeof this._axes[axis] === 'undefined') {
                throw new Error('The axis "' + axis + '" does not exist.');
            }

            return this._axes[axis];
        }

        return this._axes;

    }

    public getActions(action?: string) {

        if (action) {
            if (typeof this._actions[action] === 'undefined') {
                throw new Error('The action "' + action + '" does not exist.');
            }

            return this._actions[action];
        }

        return this._actions;

    }

    /***** Keyboard & Mouse Handlers *****/

    public handleKeyboardInputEvent(e: KeyboardEvent) {

        if (typeof this._keyboardKeyActionsMap[e.keyCode] !== "undefined") {
            const action = this._keyboardKeyActionsMap[e.keyCode];
            this._actions[action] = e.type === "keydown";
        }

    }

    public handleMouseInputEvent(e: MouseEvent) {

        const deltaX = e.movementX;
        const deltaY = e.movementY;

        for (const axis in this._mouseActionAxisMap) {
            const mouseAction = this._mouseActionAxisMap[axis];

            if (
                deltaX !== 0 &&
                mouseAction.axis === InputDeviceAxisEnum.X
            ) {
                this._axes[axis] = deltaX * mouseAction.scale;
            } else if (
                deltaY !== 0 &&
                mouseAction.axis === InputDeviceAxisEnum.X
            ) {
                this._axes[axis] = deltaY * mouseAction.scale;
            }
        }

        // Clear the position after a few miliseconds
        clearTimeout(this._mouseInterval);
        this._mouseInterval = setTimeout(
            () => {
                for (const axis in this._mouseActionAxisMap) {
                    this._axes[axis] = 0;
                }
            },
            this._mouseIntervalTime
        );

    }

    /***** Gamepad Handlers *****/

    public handleGamepadConnectedEvent(e: GamepadEvent) {

        this._isGamepadConnected = true;

    }

    public handleGamepadDisconnectedEvent(e: GamepadEvent) {

        this._isGamepadConnected = false;

    }

    /***** Pointer Lock *****/

    public addPointerLock() {

        this.requestPointerLockOnClick();

        document.addEventListener(
            "pointerlockchange",
            this.onPointerLockChange.bind(this),
            false
        );
        document.addEventListener(
            "mspointerlockchange",
            this.onPointerLockChange.bind(this),
            false
        );
        document.addEventListener(
            "mozpointerlockchange",
            this.onPointerLockChange.bind(this),
            false
        );
        document.addEventListener(
            "webkitpointerlockchange",
            this.onPointerLockChange.bind(this),
            false
        );

    }

    public removePointerLock() {

        document.removeEventListener(
            "pointerlockchange",
            this.onPointerLockChange.bind(this),
            false
        );
        document.removeEventListener(
            "mspointerlockchange",
            this.onPointerLockChange.bind(this),
            false
        );
        document.removeEventListener(
            "mozpointerlockchange",
            this.onPointerLockChange.bind(this),
            false
        );
        document.removeEventListener(
            "webkitpointerlockchange",
            this.onPointerLockChange.bind(this),
            false
        );

    }

    public onPointerLockChange() {

        let activeCamera = GameManager.activeLevel.getScene().activeCamera;

        // TODO: GameManager.engine.isPointerLock - do something with it

    }

    public requestPointerLockOnClick() {

        GameManager.activeLevel.getScene().onPointerDown = (e) => {
            let engine = GameManager.engine;
            let canvas = engine.getRenderingCanvas();
            if (!engine.isPointerLock) {
                canvas.requestPointerLock = canvas.requestPointerLock
                    || canvas.msRequestPointerLock
                    || canvas.mozRequestPointerLock
                    || canvas.webkitRequestPointerLock
                    || null;
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }
            }
        };

    }

    public exitPointerLock() {

        let engine = GameManager.engine;
        document.exitPointerLock = document.exitPointerLock
            || (<any>document).mozExitPointerLock
            || null;

        if (
            engine.isPointerLock &&
            document.exitPointerLock
        ) {
            document.exitPointerLock();
        }

    }

    /********** Helpers **********/

    public setBindings(bindings: InputBindingsInterface): InputManager {
        this._bindings = bindings;

        return this;
    }

    public getBindings(): InputBindingsInterface {
        return this._bindings;
    }

}

export interface InputBindingsInterface {
    actions: { [key: string]: Array<InputMappingInterface> };
    axes: { [key: string]: Array<InputMappingInterface> };
}

export interface InputMappingInterface {
    device: InputDeviceEnum;
    data: any;
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

export enum InputDeviceAxisEnum {
    X,
    Y
}

export enum InputDeviceGamepadThumbstickEnum {
    Left,
    Right
}
