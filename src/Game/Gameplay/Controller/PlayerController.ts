import { GameManager } from "../../../Framework/Core/GameManager";
import { AbstractController } from '../../../Framework/Gameplay/Controller/AbstractController';

export class PlayerController extends AbstractController {

    private _mesh: BABYLON.AbstractMesh;
    private _camera: BABYLON.TargetCamera;
    private _cameraPositionOffset: BABYLON.Vector3 = new BABYLON.Vector3(0, 2, -8);
    private _cameraRotationOffset: BABYLON.Vector3 = new BABYLON.Vector3(0, 10, -10)

    private _inputAxes: any;
    private _inputLocation: BABYLON.Vector3 = BABYLON.Vector3.Zero();
    private _inputRotation: BABYLON.Vector3 = BABYLON.Vector3.Zero();

    private _locationMultiplier = 50;
    private _rotationMultiplier = 10;

    public start () {

        super.start();

        GameManager.inputManager.addPointerLock();

        let scene = GameManager.activeLevel.getScene();

        this._mesh = this.getPossessableEntity().getMesh();
        scene.activeCamera = this._camera = new BABYLON.TargetCamera(
            'thirdPersonCamera',
            this._cameraPositionOffset,
            GameManager.activeLevel.getScene()
        );

        this._camera.position = this._mesh.position.add(this._cameraPositionOffset);

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
        this._inputLocation = BABYLON.Vector3.Zero();

        if (this._inputAxes['moveForward'] !== 0) {
            this._inputLocation.addInPlace(
                new BABYLON.Vector3(0, 0, this._inputAxes['moveForward'] * this._locationMultiplier)
            );
        }

        if (this._inputAxes['moveRight'] !== 0) {
            this._inputLocation.addInPlace(
                new BABYLON.Vector3(this._inputAxes['moveRight'] * this._locationMultiplier, 0, 0)
            );
        }

        // Rotation
        this._inputRotation = BABYLON.Vector3.Zero();

        if (this._inputAxes['lookRight'] !== 0) {
            this._inputRotation.addInPlace(
                new BABYLON.Vector3(0, this._inputAxes['lookRight'] * this._rotationMultiplier, 0)
            );
        }

        if (this._inputAxes['lookUp'] !== 0) {
            this._inputRotation.addInPlace(
                new BABYLON.Vector3(this._inputAxes['lookUp'] * this._rotationMultiplier, 0, 0)
            );
        }

    }

    public updateMesh() {

        this.setLocationInput(this._inputLocation);

    }

    public updateCamera() {

        // TODO: take rotation into account

        this._camera.position = this._mesh.position.add(this._cameraPositionOffset);
    }

}
