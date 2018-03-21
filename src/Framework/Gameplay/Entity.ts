export class Entity {

    constructor (private _mesh: BABYLON.AbstractMesh) {}

    public getMesh(): BABYLON.AbstractMesh {
        return this._mesh;
    }

    public getMeshTransform() {
        const mesh = this.getMesh();
        // const meshLinearVelocity = mesh.physicsImpostor.getLinearVelocity();
        // const meshAngularVelocity = mesh.physicsImpostor.getAngularVelocity();

        const position = {
            x: mesh.position.x,
            y: mesh.position.y,
            z: mesh.position.z,
        };
        const rotation = {
            x: mesh.rotationQuaternion.x,
            y: mesh.rotationQuaternion.y,
            z: mesh.rotationQuaternion.z,
            w: mesh.rotationQuaternion.w,
        };
        // const scale = { x: mesh.scaling.x, y: mesh.scaling.y, z: mesh.scaling.z };
        // const linearVelocity = { x: meshLinearVelocity.x, y: meshLinearVelocity.y, z: meshLinearVelocity.z };
        // const angularVelocity = { x: meshAngularVelocity.x, y: meshAngularVelocity.y, z: meshAngularVelocity.z };

        let transform = {
            position: position,
            rotation: rotation,
            // scale: scale,
            // linearVelocity: linearVelocity,
            // angularVelocity: angularVelocity,
        };

        return transform;
    }

    public isMeshTransformSameAs(lastTransform?): boolean {
        if (lastTransform === null) {
            return false;
        }

        const meshTransform = this.getMeshTransform();

        if (
            lastTransform.position.x === meshTransform.position.x &&
            lastTransform.position.y === meshTransform.position.y &&
            lastTransform.position.z === meshTransform.position.z &&
            lastTransform.rotation.x === meshTransform.rotation.x &&
            lastTransform.rotation.y === meshTransform.rotation.y &&
            lastTransform.rotation.z === meshTransform.rotation.z &&
            lastTransform.rotation.w === meshTransform.rotation.w /* &&
            lastTransform.scale.x === meshTransform.scale.x &&
            lastTransform.scale.y === meshTransform.scale.y &&
            lastTransform.scale.z === meshTransform.scale.z */
        ) {
            return true;
        }

        return false;
    }

}
