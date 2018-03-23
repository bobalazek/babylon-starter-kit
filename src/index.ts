import { GameManager } from "./Framework/Core/GameManager";

import { InputBindingsDefault } from "./Framework/Input/Bindings/InputBindingsDefault";
import { PlayerController } from "./Framework/Gameplay/Controller/PlayerController";
import { HelloWorldLevel } from "./Game/Levels/HelloWorldLevel";

// CSS
import "./static/stylesheets/main.css";

// Boot up the game!
GameManager.boot({
    debug: true, // TODO: should not be hardcoded!
    startupLevel: HelloWorldLevel,
    inputBindings: InputBindingsDefault,
    controller: PlayerController,
});
