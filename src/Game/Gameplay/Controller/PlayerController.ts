import { GameManager } from "../../../Framework/Core/GameManager";
import { AbstractController } from '../../../Framework/Gameplay/Controller/AbstractController';

export class PlayerController extends AbstractController {

    private _mesh: BABYLON.AbstractMesh;
    private _camera: BABYLON.ArcRotateCamera;
    private _cameraRadius: number = 8;

    private _inputAxes: any;
    private _inputLocation: BABYLON.Vector2 = BABYLON.Vector2.Zero();
    private _inputRotation: BABYLON.Vector2 = BABYLON.Vector2.Zero();

    private _locationMultiplier = 50;
    private _rotationMultiplier = 0.05;

    private _forward: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 1);

    public start () {

        super.start();

        GameManager.inputManager.addPointerLock();

        let scene = GameManager.activeLevel.getScene();

        this._mesh = this.getPossessableEntity().getMesh();
        scene.activeCamera = this._camera = new BABYLON.ArcRotateCamera(
            'thirdPersonCamera',
            -Math.PI / 2,
            Math.PI / 2,
            this._cameraRadius,
            this._mesh.position,
            GameManager.activeLevel.getScene()
        );

        this._camera.lockedTarget = this._mesh;

    }

    public update () {

        this.updateInput();
        this.updateMesh();
        this.updateCamera();

    }

    public updateInput() {

        this._inputAxes = GameManager.inputManager.getAxes();

        // Location
        this._inputLocation = BABYLON.Vector2.Zero();

        if (this._inputAxes['moveForward'] !== 0) {
            this._inputLocation.addInPlace(
                new BABYLON.Vector2(0, this._inputAxes['moveForward'] * this._locationMultiplier)
            );
        }

        if (this._inputAxes['moveRight'] !== 0) {
            this._inputLocation.addInPlace(
                new BABYLON.Vector2(this._inputAxes['moveRight'] * this._locationMultiplier, 0)
            );
        }

        // Rotation
        this._inputRotation = BABYLON.Vector2.Zero();

        if (this._inputAxes['lookRight'] !== 0) {
            this._inputRotation.addInPlace(
                new BABYLON.Vector2(this._inputAxes['lookRight'] * this._rotationMultiplier, 0)
            );
        }

        if (this._inputAxes['lookUp'] !== 0) {
            this._inputRotation.addInPlace(
                new BABYLON.Vector2(0, this._inputAxes['lookUp'] * this._rotationMultiplier)
            );
        }

    }

    public updateMesh() {

        const possessableEntity = this.getPossessableEntity()
        if (possessableEntity) {
            const cameraDirection = this._camera.getForwardRay().direction;
            const mesh = possessableEntity.getMesh();
            const physicsBody = mesh.physicsImpostor;
            const meshForward = BABYLON.Vector3.TransformNormal(
                this._forward,
                mesh.getPoseMatrix()
            );
            const meshDirection = BABYLON.Vector3.Normalize(meshForward);

            let meshCameraDirectionDiff = BABYLON.Vector3.Zero();
            meshDirection.subtractToRef(cameraDirection, meshCameraDirectionDiff);

            if (this._inputRotation.x !== 0) {
                let yaw = 0;

                // TODO: rotate

                mesh.rotate(BABYLON.Axis.Y, yaw, BABYLON.Space.LOCAL);
            }

            if (this._inputLocation !== BABYLON.Vector2.Zero()) {
                let force = BABYLON.Vector3.Zero();

                // TODO: move

                physicsBody.applyForce(
                    force,
                    physicsBody.getObjectCenter()
                );
            }
        }

    }

    public updateCamera() {

        // TODO: collisions

        this._camera.alpha += this._inputRotation.x * this._rotationMultiplier * -1;
        this._camera.beta += this._inputRotation.y * this._rotationMultiplier * -1;

    }

}
