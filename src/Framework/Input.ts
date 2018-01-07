import { GameManager } from './GameManager';

import {
    InputGamepad,
    InputGamepadAxisEnum
} from './Input/InputGamepad';

export class InputManager {

    private _bindings: InputBindingsInterface;

    private _mode: InputModeEnum = InputModeEnum.KeyboardAndMouse;

    // Axes & actions
    private _axes: { [key: string]: number } = {};
    private _actions: { [key: string]: boolean } = {};

    // Keyboard stuff
    private _keyboardActionsMap: { [key: number]: string } = {};
    private _keyboardKeysPressed: Array<number> = [];

    // Mouse staff
    private _mouseAxesMap: { [key: number]: any } = {};
    private _mouseInterval: any; // TODO: correct type for setInterval?
    private _mouseIntervalTime: number = 50; // after how many miliseconds it should clear the values?

    // Gamepad stuff
    public hasGamepadSupport: boolean = 'GamepadEvent' in window;
    private _gamepads: Array<InputGamepad> = [];
    private _gamepadActionsMap: { [key: number]: string } = {};
    private _gamepadAxesMap: { [key: number]: any } = {};


    constructor(bindings: InputBindingsInterface) {

        this._bindings = new (<any>bindings);

        // Populate the axes & actions
        for (const key in this._bindings.axes) {
            this._axes[key] = 0.0;

            const mappings = this._bindings.axes[key];
            for (let i = 0; i < mappings.length; i++) {
                if (mappings[i].device === InputDeviceEnum.Mouse) {
                    this._mouseAxesMap[key] = mappings[i].data;
                } else if (mappings[i].device === InputDeviceEnum.Gamepad) {
                    this._gamepadAxesMap[key] = mappings[i].data;
                }
            }
        }

        for (const key in this._bindings.actions) {
            this._actions[key] = false;

            const mappings = this._bindings.actions[key];
            for (let i = 0; i < mappings.length; i++) {
                if (mappings[i].device === InputDeviceEnum.Keyboard) {
                    this._keyboardActionsMap[mappings[i].data.keyCode] = key;
                } else if (mappings[i].device === InputDeviceEnum.Gamepad) {
                    this._gamepadActionsMap[mappings[i].data.button] = key;
                }
            }
        }

        // Gamepads
        if (this.hasGamepadSupport) {
            this.prepareGamepads();
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
        if (this.hasGamepadSupport) {
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
        if (this.hasGamepadSupport) {
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

    }

    public update() {

        const gamepads = this.getGamepads();
        if (gamepads.length) {
            for (let i = 0; i < gamepads.length; i++) {
                gamepads[i].update();

                // TODO: determine when the mode is switched. When a button is pressed?

                if (this._mode === InputModeEnum.Gamepad) {
                    this.updateAxesAndActionsByGamepad(gamepads[i]);
                }
            }
        }

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

    public getGamepads() {
        return this._gamepads;
    }

    public prepareGamepads() {

        const gamepads = navigator.getGamepads
            ? navigator.getGamepads()
            : (navigator.webkitGetGamepads
                ? navigator.webkitGetGamepads()
                : []
            );

        this._gamepads = new Array();
        for (let i = 0; i < gamepads.length; i++) {
            const gamepad = gamepads[i];
            if (gamepad === null) {
                continue;
            }

            this._gamepads.push(
                new InputGamepad(
                    gamepad
                )
            );
        }

    }

    /***** Keyboard & Mouse Handlers *****/

    public handleKeyboardInputEvent(e: KeyboardEvent) {

        const isKeydown = e.type === "keydown";

        if (typeof this._keyboardActionsMap[e.keyCode] !== "undefined") {
            const action = this._keyboardActionsMap[e.keyCode];
            this._actions[action] = isKeydown;
        }

        if (isKeydown) {
            this._keyboardKeysPressed.push(e.keyCode);
        } else {
            var index = this._keyboardKeysPressed.indexOf(e.keyCode);
            if (index > -1) {
                this._keyboardKeysPressed.splice(index, 1);
            }
        }

    }

    public handleMouseInputEvent(e: MouseEvent) {

        const deltaX = e.movementX;
        const deltaY = e.movementY;

        for (const axis in this._mouseAxesMap) {
            const mouseAction = this._mouseAxesMap[axis];

            if (
                deltaX !== 0 &&
                mouseAction.axis === InputGamepadAxisEnum.X
            ) {
                this._axes[axis] = deltaX * mouseAction.scale;
            } else if (
                deltaY !== 0 &&
                mouseAction.axis === InputGamepadAxisEnum.X
            ) {
                this._axes[axis] = deltaY * mouseAction.scale;
            }
        }

        // Clear the position after a few miliseconds
        clearTimeout(this._mouseInterval);
        this._mouseInterval = setTimeout(
            () => {
                for (const axis in this._mouseAxesMap) {
                    this._axes[axis] = 0;
                }
            },
            this._mouseIntervalTime
        );

    }

    /***** Gamepad Handlers *****/

    public handleGamepadConnectedEvent(e: GamepadEvent) {

        this.prepareGamepads();

    }

    public handleGamepadDisconnectedEvent(e: GamepadEvent) {

        this.prepareGamepads();

    }

    public updateAxesAndActionsByGamepad(gamepad: InputGamepad) {

        // Axes
        for (const axis in this._gamepadAxesMap) {
            // TODO
        }

        // Actions
        for (const axis in this._gamepadActionsMap) {
            // TODO
        }

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
