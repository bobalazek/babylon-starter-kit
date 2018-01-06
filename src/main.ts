import { GameManager } from "./Framework/GameManager";
import { InputBindingsDefault } from "./Framework/Input/InputBindingsDefault";

import { HelloWorldLevel } from "./Game/Levels/HelloWorldLevel";

// You can add your own & custom stylesheets below
import "./static/stylesheets/main.css";

// Boot up the game!
GameManager.boot({
    startupLevel: HelloWorldLevel,
    inputBindings: InputBindingsDefault,
});
