import { AbstractLevel } from './AbstractLevel';

export class MeshManager {

    public level: AbstractLevel;

    private loading: { [key: string]: ((mesh: BABYLON.AbstractMesh) => void)[] };
    private loaded: { [key: string]: BABYLON.AbstractMesh };

    constructor(level: AbstractLevel) {
        this.level = level;
    }

    public load(name: string, url: string, callback: (mesh: BABYLON.AbstractMesh) => void) {
        let self = this;
        const path = `${ url }${ name }`;

        if (typeof this.loaded[path] !== 'undefined') {
            callback(
                this.loaded[path]
            );
        } else if (typeof this.loading[path] !== 'undefined') {
            this.loading[path].push(callback);
        } else {
            let meshTask = this.level.getAssetsManager().addMeshTask(
                "meshTask_" + path,
                "",
                url,
                name
            );
            meshTask.onSuccess = (task: BABYLON.MeshAssetTask) => {
                this.loaded[path] = <BABYLON.AbstractMesh>task.loadedMeshes[0];
                this.loaded[path].isVisible = false;

                callback(this.loaded[path]);

                // Also emmit the mesh to all the waiting callbacks
                for (let i = 0; i < this.loading[path].length; i++) {
                    this.loading[path][i](this.loaded[path]);
                }

                // Cleanup
                delete this.loading[path];
            };
            this.loading[path] = [];
        }
    }

}
