import * as BABYLON from 'babylonjs';

import { AbstractLevel } from './AbstractLevel'

export class GameManager {

    public static canvas: HTMLCanvasElement;
    public static engine: BABYLON.Engine;
    public static activeLevel: AbstractLevel;

    public static boot(config: ConfigInterface) {
        this.canvas = document.getElementById("game") as HTMLCanvasElement;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.activeLevel = new (<any>config.startupLevel)();

        this.activeLevel.onLevelReady(() => {
            this.engine.runRenderLoop(() => {
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
}
