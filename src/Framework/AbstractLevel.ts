import { GameManager } from './GameManager';
import { MeshManager } from './MeshManager';

export class AbstractLevel {

    protected _scene: BABYLON.Scene;
    protected _assetsManager: BABYLON.AssetsManager;
    protected _meshManager: MeshManager;
    protected _onLevelReadyIntervalTime: number = 100;

    public isLevelLoaded: boolean = false;
    public isLevelAssetsLoaded: boolean = false;

    constructor() {

        this._scene = new BABYLON.Scene(GameManager.engine);
        this._assetsManager = new BABYLON.AssetsManager(this._scene);
        this._meshManager = new MeshManager(this);

    }

    /********** User overwritable methods **********/

    /**
     * Starts the game logic.
     */
    public start() {
        // Your game logic will be here ...
    }

    /**
     * If you need to do something before we start the level, like manually loading meshes via the MeshManager.
     */
    public onPreLevelStart(callback: () => void) {
        callback();
    }

    /**
     * If called on each progress of the assets manager.
     */
    public onLevelAssetsProgress(remainingCount: number, totalCount: number, lastTask: BABYLON.AbstractAssetTask) {
        GameManager.engine.loadingUIText = [
            'We are loading the scene. ',
            remainingCount + ' out of ' + totalCount + ' items still need to be loaded.',
        ].join('');
    }

    /**
     * Once all the assets were loaded.
     */
    public onLevelAssetsFinish() {
        this.isLevelAssetsLoaded = true;
    }

    /********** Helpers **********/

    /**
     * When the level is ready.
     */
    public onLevelPostLoad(callback: () => void) {

        this.onPreLevelStart(() => {
            this.isLevelLoaded = true;
            this.start();
        });

        // Assets manager
        this._assetsManager.load();
        this._assetsManager.onProgress = this.onLevelAssetsProgress;
        this._assetsManager.onFinish = this.onLevelAssetsFinish;

        this.isLevelAssetsLoaded = true; // TODO: fix in babylon

        // Interval
        let interval = setInterval(() => {
            if (
                this.isLevelLoaded &&
                this.isLevelAssetsLoaded
            ) {
                clearInterval(interval);
                callback();
            }
        }, this._onLevelReadyIntervalTime);

    }

    public render() {
        this._scene.render();
    }

    public getScene(): BABYLON.Scene {
        return this._scene;
    }

    public getAssetsManager(): BABYLON.AssetsManager {
        return this._assetsManager;
    }

    public getMeshManager(): MeshManager {
        return this._meshManager;
    }

}
