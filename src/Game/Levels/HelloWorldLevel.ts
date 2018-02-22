import { GameManager } from "../../Framework/Core/GameManager";
import { AbstractBaseScene } from './AbstractBaseScene';
import { PossessableEntity } from "../../Framework/Gameplay/PossessableEntity";

export class HelloWorldLevel extends AbstractBaseScene {

    public start() {

        super.start();

        // Spawn a spectator camera, until our player is ready
        let camera = new BABYLON.UniversalCamera(
            "spectatorCamera",
            new BABYLON.Vector3(0, 4, -8),
            this.getScene()
        );

        // Player
        let player = BABYLON.MeshBuilder.CreateSphere("player", {
            diameterY: 2,
        }, this.getScene());
        player.position = new BABYLON.Vector3(0, 2, 8);
        player.physicsImpostor = new BABYLON.PhysicsImpostor(
            player,
            BABYLON.PhysicsImpostor.SphereImpostor,
            {
                mass: 1,
                restitution: 0,
            },
            this.getScene()
        );
        player.physicsImpostor.physicsBody.angularDamping = 1;

        this._player = new PossessableEntity(player);

    }

}
