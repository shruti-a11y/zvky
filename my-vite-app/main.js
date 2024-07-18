import * as PIXI from 'pixi.js'
import { createGameUI } from './public/js/ui.js';


const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight
});
globalThis.__PIXI_APP__ = app;
const loaderContainer = document.getElementById('loader');

let loader = PIXI.Loader.shared;

// Load the assets.json file
loader.add('assets', 'public/assets/asset.json')
  .load((loader, resources) => {
    let assets = resources.assets.data.assets;

    // Add assets from the JSON file to the loader
    for (let [key, value] of Object.entries(assets)) {
      loader.add(key, value);
    }

    // Load the assets
    loader.load(onAssetsLoading);
  });

let loaderBar = document.getElementById('loader-bar');

loader.onProgress.add((loader) => {
  gsap.to(loaderBar, {
    duration: 0.5,
    width: `${loader.progress}%`
  });
  // loadingText.textContent = `Loading... ${Math.round(loader.progress)}%`;
});

function onAssetsLoading(loader, resources) {
  console.log('Assets loaded:', resources);
  loader.onComplete.add(() => {
    setTimeout(() => {
      loaderContainer.style.display = 'none';
      document.getElementById('game-container').appendChild(app.view);
      createGameUI(app);
      }, 3000);
  });

  loader.load();
}
// function startGame(spineCharacter) {
//   // Position and scale the Spine animation
//   spineCharacter.x = app.screen.width / 2;
//   spineCharacter.y = app.screen.height / 2;
//   spineCharacter.scale.set(0.5);

//   // Add Spine animation to the stage
//   app.stage.addChild(spineCharacter);

//   // Example: Play an animation
//   spineCharacter.state.setAnimation(0, 'idle', true); // Replace 'idle' with your animation name
// }

// // Check if assets are already loaded
// if (PIXI.Loader.resources && PIXI.Loader.resources.spineCharacter) {
//   startGame(new PIXI.spine.Spine(PIXI.Loader.resources.spineCharacter.spineData));
// } else {
//   // Wait for loader to complete
//   console.log("ccc")
// }





export { app };

