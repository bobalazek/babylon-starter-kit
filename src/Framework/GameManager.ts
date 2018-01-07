import * as BABYLON from 'babylonjs';

import { AbstractLevel } from './AbstractLevel';
import { InputManager } from './Input';

export class GameManager {

    public static canvas: HTMLCanvasElement;
    public static engine: BABYLON.Engine;

    public static inputManager: InputManager;

    public static activeLevel: AbstractLevel;

    public static boot(config: ConfigInterface) {

        if (!BABYLON.Engine.isSupported()) {
            alert('Sorry, but your device is unable to run this game :(');
            return false;
        }

        this.canvas = document.getElementById("game") as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.inputManager = new InputManager(config.inputBindings);

        this.activeLevel = new (<any>config.startupLevel)();

        this.activeLevel.onLevelReady(() => {
            this.inputManager.watch();

            this.engine.runRenderLoop(() => {
                this.inputManager.update();
                this.activeLevel.render();
            });
        });

        window.addEventListener("resize", () => {
            this.engine.resize();
        });

    }

    public static switchLevel(level: any /* AbstractLevel; // TODO: fix; not working ATM*/) {

        let newActiveLevel = new (<any>level)();
        newActiveLevel.onLevelReady(() => {
            this.activeLevel = newActiveLevel;
        });

    }

}

export interface ConfigInterface {
    startupLevel: any; // AbstractLevel; // TODO: fix; not working ATM
    inputBindings: any; // same as above
}
