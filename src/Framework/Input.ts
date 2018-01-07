import { GameManager } from './GameManager';

import {
    InputGamepad,
    InputGamepadAxisEnum,
    InputGamepadAxisPropertyEnum,
    InputGamepadButtonEnum,
    InputGamepadButtonPropertyEnum
} from './Input/InputGamepad';

export class InputManager {

    public hasGamepadSupport: boolean = 'GamepadEvent' in window;

    private _bindings: InputBindingsInterface;
    private _mode: InputModeEnum = InputModeEnum.KeyboardAndMouse;

    // Axes & actions
    private _axes: { [key: string]: number } = {};
    private _actions: { [key: string]: boolean } = {};

    // Keyboard stuff
    private _keyboardActionsMap: { [key: string]: string } = {};
    private _keyboardAxesMap: { [key: string]: any } = {}; // ex.: [ moveForward: { keyCode: 68, scale: 1 } ]
    private _keyboardAxesKeyScaleMap: { [key: number]: { axis: string, scale: number } } = {}; // ex.: [ 66: { axis: "moveForward", scale: 1 } ]
    private _keyboardKeysPressed: Array<number> = [];

    // Mouse staff
    private _mouseAxesMap: { [key: string]: any } = {};
    private _mouseInterval: any;
    private _mouseIntervalTime: number = 50; // after how many miliseconds it should clear the values?

    // Gamepad stuff
    private _gamepads: Array<InputGamepad> = [];
    private _gamepadActionsMap: { [key: string]: string } = {};
    private _gamepadActionsInversedMap: { [key: string]: number } = {}; // have the actions on the left & button on the right
    private _gamepadAxesMap: { [key: string]: any } = {};

    constructor(bindings: InputBindingsInterface) {

        this._bindings = bindings;

        // Populate the axes & actions
        for (const axis in this._bindings.axes) {
            this._axes[axis] = 0.0;

            const mappings = this._bindings.axes[axis];
            for (let i = 0; i < mappings.length; i++) {
                if (mappings[i].device === InputDeviceEnum.Mouse) {
                    this._mouseAxesMap[axis] = mappings[i].data;
                } else if (mappings[i].device === InputDeviceEnum.Keyboard) {
                    this._keyboardAxesMap[axis] = mappings[i].data;
                    this._keyboardAxesKeyScaleMap[mappings[i].data.keyCode] = {
                        axis: axis,
                        scale: mappings[i].data.scale,
                    };
                } else if (mappings[i].device === InputDeviceEnum.Gamepad) {
                    this._gamepadAxesMap[axis] = mappings[i].data;
                }
            }
        }

        for (const action in this._bindings.actions) {
            this._actions[action] = false;

            const mappings = this._bindings.actions[action];
            for (let i = 0; i < mappings.length; i++) {
                if (mappings[i].device === InputDeviceEnum.Keyboard) {
                    this._keyboardActionsMap[mappings[i].data.keyCode] = action;
                } else if (mappings[i].device === InputDeviceEnum.Gamepad) {
                    this._gamepadActionsMap[mappings[i].data.button] = action;
                    this._gamepadActionsInversedMap[action] = mappings[i].data.button;
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

                if (
                    (
                        gamepads[i].buttonA ||
                        gamepads[i].buttonB ||
                        gamepads[i].buttonX ||
                        gamepads[i].buttonY
                    ) &&
                    this._mode !== InputModeEnum.Gamepad
                ) {
                    this._mode = InputModeEnum.Gamepad;
                    this.resetAxesAndActions();
                }

                if (this._mode === InputModeEnum.Gamepad) {
                    this.updateAxesAndActionsByGamepad(gamepads[i]);
                }
            }
        }

        if (this._mode === InputModeEnum.KeyboardAndMouse) {
            this.updateAxesByKeyboard();
        }

    }

    public getMode() {
        return this._mode;
    }

    public setBindings(bindings: InputBindingsInterface): InputManager {
        this._bindings = bindings;

        return this;
    }

    public getBindings(): InputBindingsInterface {
        return this._bindings;
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

    public resetAxesAndActions() {

        // Axes
        for (const axis in this._bindings.axes) {
            this._axes[axis] = 0.0;
        }

        // Actions
        for (const action in this._bindings.actions) {
            this._actions[action] = false;
        }

    }

    /***** Keyboard & Mouse Handlers *****/

    public handleKeyboardInputEvent(e: KeyboardEvent) {

        const isKeydown = e.type === "keydown";

        if (
            isKeydown &&
            this._mode !== InputModeEnum.KeyboardAndMouse
        ) {
            this._mode = InputModeEnum.KeyboardAndMouse;
            this.resetAxesAndActions();
        }

        if (typeof this._keyboardActionsMap[e.keyCode] !== "undefined") {
            const action = this._keyboardActionsMap[e.keyCode];
            this._actions[action] = isKeydown;
        }

        if (isKeydown) {
            var index = this._keyboardKeysPressed.indexOf(e.keyCode);
            if (index === -1) {
                this._keyboardKeysPressed.push(e.keyCode);
            }
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
                mouseAction.axis === InputAxisEnum.X
            ) {
                this._axes[axis] = deltaX * mouseAction.scale;
            } else if (
                deltaY !== 0 &&
                mouseAction.axis === InputAxisEnum.X
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

    // TODO: probably needs optimization
    public updateAxesByKeyboard() {

        let affectedAxes = {};
        for (let i = 0; i < this._keyboardKeysPressed.length; i++) {
            const keyCode = this._keyboardKeysPressed[i];
            if (this._keyboardAxesKeyScaleMap[keyCode]) {
                const axis = this._keyboardAxesKeyScaleMap[keyCode].axis;
                const scale = this._keyboardAxesKeyScaleMap[keyCode].scale;

                if (typeof affectedAxes[axis] === "undefined") {
                    affectedAxes[axis] = { min: 0, max: 0 };
                }

                if (scale < affectedAxes[axis].min) {
                    affectedAxes[axis].min = scale;
                }
                if (scale > affectedAxes[axis].max) {
                    affectedAxes[axis].max = scale;
                }
            }
        }

        for (const axis in this._bindings.axes) {
            var value = 0.0;

            if (typeof affectedAxes[axis] !== "undefined") {
                const affectedAxis = affectedAxes[axis];
                if (affectedAxis.min !== 0 || affectedAxis.max !== 0) {
                    if (affectedAxis.min !== 0 && affectedAxis.max === 0) {
                        value = affectedAxis.min;
                    } else if (affectedAxis.min === 0 && affectedAxis.max !== 0) {
                        value = affectedAxis.max;
                    }
                }
            }

            this._axes[axis] = value;
        }

    }

    /***** Gamepad Handlers *****/

    public handleGamepadConnectedEvent(e: GamepadEvent) {

        this.prepareGamepads();

    }

    public handleGamepadDisconnectedEvent(e: GamepadEvent) {

        this.prepareGamepads();

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

    public updateAxesAndActionsByGamepad(gamepad: InputGamepad) {

        // Axes
        for (const key in this._axes) {
            const axis = this._axes[key];
            const actionAxis = this._gamepadAxesMap[axis].axis;
            const actionScale = this._gamepadAxesMap[axis].scale;
            this._axes[axis] = gamepad[
                InputGamepadAxisPropertyEnum[InputGamepadAxisEnum[actionAxis]]
            ] * actionScale;
        }

        // Actions
        for (const key in this._actions) {
            const action = this._actions[key];
            const actionEnum = this._gamepadActionsInversedMap[key];
            this._actions[key] = gamepad[
                InputGamepadButtonPropertyEnum[InputGamepadButtonEnum[actionEnum]]
            ];
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

        // TODO: GameManager.engine.isPointerLock - do something with it?

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

}

export class AbstractInputBindings {
    actions: { [key: string]: Array<InputMappingInterface> } = {};
    axes: { [key: string]: Array<InputMappingInterface> } = {};
}

export interface InputBindingsInterface {
    actions: { [key: string]: Array<InputMappingInterface> };
    axes: { [key: string]: Array<InputMappingInterface> };
}

export interface InputMappingInterface {
    device: InputDeviceEnum;
    data: any;
}

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
