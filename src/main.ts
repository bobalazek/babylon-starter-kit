import { GameManager } from "./Framework/GameManager";
import { InputBindingsDefault } from "./Framework/Input/Bindings/InputBindingsDefault";

import { HelloWorldLevel } from "./Game/Levels/HelloWorldLevel";

// You can add your own & custom stylesheets below
import "./static/stylesheets/main.css";

// Boot up the game!
GameManager.boot({
    debug: true, // TODO
    startupLevel: HelloWorldLevel,
    inputBindings: InputBindingsDefault,
});
