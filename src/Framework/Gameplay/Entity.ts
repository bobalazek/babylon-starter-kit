export class Entity {

    constructor (private _mesh: BABYLON.AbstractMesh) {}

    public getMesh(): BABYLON.AbstractMesh {
        return this._mesh;
    }

}
