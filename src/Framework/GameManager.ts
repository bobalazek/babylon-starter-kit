import * as BABYLON from 'babylonjs';

import { AbstractLevel } from './AbstractLevel';
import { InputManager, AbstractInputBindings } from './Input';

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

        this.inputManager = new InputManager(
            new (<any>config.inputBindings)
        );

        this.activeLevel = new (<any>config.startupLevel)();

        this.activeLevel.onLevelPostLoad(() => {
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

    public static switchLevel(level: typeof AbstractLevel) {

        let newActiveLevel = new (<any>level)();
        newActiveLevel.onLevelReady(() => {
            this.activeLevel = newActiveLevel;
        });

    }

}

export interface ConfigInterface {
    startupLevel: typeof AbstractLevel;
    inputBindings: typeof AbstractInputBindings;
}
