import { GameManager } from "./Framework/GameManager";

import { InputBindingsDefault } from "./Framework/Input/Bindings/InputBindingsDefault";
import { HelloWorldLevel } from "./Game/Levels/HelloWorldLevel";

// Boot up the game!
GameManager.boot({
    debug: true, // TODO: should not be hardcoded!
    startupLevel: HelloWorldLevel,
    inputBindings: InputBindingsDefault,
});
