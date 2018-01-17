import { GameManager } from "./Framework/Core/GameManager";

import { InputBindingsDefault } from "./Framework/Input/Bindings/InputBindingsDefault";
import { HelloWorldLevel } from "./Game/Levels/HelloWorldLevel";
import { PlayerController } from "./Game/PlayerController";

// Boot up the game!
GameManager.boot({
    debug: true, // TODO: should not be hardcoded!
    startupLevel: HelloWorldLevel,
    inputBindings: InputBindingsDefault,
    controller: PlayerController,
});
