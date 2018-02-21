# Babylon Starter Kit
A starter kit for BabylonJS.


## Installation

* Navigate to the root of the project
* Run `npm install`
* That's it!


## Development

* Navigate to the root of the project
* Run `npm dev-start`
* That's it!


## Concepts

### GameManager

That is our main object in the game. It handles the boot up of the game & contains the main, static variables (engine, canvas element, input manager, currently active level, ...). You can use it all across your codebase, as all the important variables are static.


#### GameManager - InputManager

Handles all the input stuff for the keyboard, mouse & gamepad(-s). The most important methods here are are `GameManager.inputManager.getAxes()` and `GameManager.inputManager.getActions()`. It will return back the axes values & action booleans, that you specified as your input bindings.


#### GameManager - InputManager - InputBindings

This is the class, that will supply your input manager with your bindings. View the `src/Framework/Input/Bindings/InputBindingsDefault` class as an example.


### Level

For those of you who are from Unity or UE4, you should probably know the concept of a level. In this case it's quite similar. A level in this case is a wrapper around the **scene** (that is in the case of babylon & other 3D web engines the closest concept of a level). But because we want our scene to have more components (such as the scene itself, assets manager, mesh manager, player controller, ...), we wrap everything inside the **level**.

All your levels should go inside the `src/Game/Levels/` directory. Your level class needs to extend the `src/Framework/AbstractLevel`. Your level should then include the following methods:

* `AbstractLevel::start()` - this is where all your game logic will go in.
* (optional) `AbstractLevel::onPreStart(callback: () => void)` - into this method you will normally put some preloading stuff: meshes, audio, video, ... for later use. It you MUST call the callback after all your assets have been loaded, else the level will not start.
* (optional) `AbstractLevel::onAssetsProgress(remainingCount: number, totalCount: number, lastTask: BABYLON.AbstractAssetTask)` - will be run by the assets manager, after an asset was loaded. You can change the loading text here (ex.: `GameManager.engine.loadingUIText = "We are loading the assets. " + remainingCount + " assets are left to be loaded."`).
* (optional) `AbstractLevel:: onAssetsFinish()` - will run after all the assets have been loaded.


#### Level - AssetsManager

This is just the native assets manager from babylon, that you can inside the level.

#### Level - MeshManager

An extended version of the assets manager, but it automatically handles & reuses existing meshes, if they were already loaded.


## Directory structure

* `src/`
    * `src/index.ts` - the main file that boots up the game.
    * `src/static/` - all of your static assets, such as 3D models, CSS, audio, ...
    * `src/Game/` - all of your game logic belongs here.
    * `src/Framework/` - all of your generic engine stuff will belong here. Think of it as a collection of classes, helpers, managers, ... that you'll be able to reuse in your next game.


## Credits

* Ground - http://seamless-pixels.blogspot.si/p/free-seamless-ground-textures.html
* Underwater ground - https://hhh316.deviantart.com/art/Seamless-Beach-Sand-Texture-271683282
* Water - http://www.cadhatch.com/seamless-water-textures/4588167784


## License
Babylon Starter Kit is licensed under the MIT license.
