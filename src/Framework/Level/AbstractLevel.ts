import { GameManager } from '../Core/GameManager';
import { MeshManager } from '../Core/MeshManager';

import { PossessableEntity } from '../Gameplay/PossessableEntity';

export class AbstractLevel {

    protected _scene: BABYLON.Scene;
    protected _assetsManager: BABYLON.AssetsManager;
    protected _meshManager: MeshManager;
    protected _onLevelReadyIntervalTime: number = 100;
    protected _player: PossessableEntity;

    public isLoaded: boolean = false;
    public isAssetsLoaded: boolean = false;

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
    public onPreStart(callback: () => void) {
        callback();
    }

    /**
     * If called on each progress of the assets manager.
     */
    public onAssetsProgress(remainingCount: number, totalCount: number, lastTask: BABYLON.AbstractAssetTask) {
        GameManager.engine.loadingUIText = [
            'We are loading the scene. ',
            remainingCount + ' out of ' + totalCount + ' items still need to be loaded.',
        ].join('');
    }

    /**
     * Once all the assets were loaded.
     */
    public onAssetsFinish() {
        // Do something after all the assets were loaded ...
    }

    /********** Helpers **********/

    /**
     * When the level is ready.
     */
    public onPostLoad(callback: () => void) {

        this.onPreStart(() => {
            this.isLoaded = true;
            this.start();
        });

        // Assets manager
        this._assetsManager.onProgress = this.onAssetsProgress.bind(this);
        this._assetsManager.onFinish = () => {
            this.onAssetsFinish.bind(this);

            this.isAssetsLoaded = true;
        };
        this._assetsManager.load();

        // Interval
        let interval = setInterval(() => {
            if (
                this.isLoaded &&
                this.isAssetsLoaded
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

    public getPlayer(): PossessableEntity {
        return this._player;
    }

}
