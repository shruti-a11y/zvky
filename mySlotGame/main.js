import * as PIXI from 'pixi.js'
import { createGameUI } from './public/js/ui.js';
import { Spine } from '@esotericsoftware/spine-pixi';






const app = new PIXI.Application({


  resizeTo: window,
  antialias: true,
  resolution: 1
});
globalThis.__PIXI_APP__ = app;



async function loadJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


async function loadAssets(jsonPath) {
  const assets = await loadJSON(jsonPath);

  let loaderBar = document.getElementById('loader-bar');
  let loadedAssets = 0;


  const onAssetLoaded = () => {
    loadedAssets += 1;
    const progressPercentage = (loadedAssets / 52) * 100;
    console.log(`Progress: ${progressPercentage.toFixed(2)}%`);
    gsap.to(loaderBar, {
      duration: 0.5,
      width: `${progressPercentage.toFixed(2)}%`
    });
  };

  const assetPromises = Object.entries(assets.assets).map(([ali, url]) => {
    return PIXI.Assets.load(url).then(() => {

      console.log(`Loaded asset: ${ali}`);
      onAssetLoaded();

    });
  });


  await Promise.all(assetPromises);
}


async function setup() {
  await loadAssets('public/assets/asset.json');
  PIXI.Assets.add("spineboyData", "./public/assets/Animations/background/BaseGame_BG.json");
  PIXI.Assets.add("spineboyAtlas", "./public/assets/Animations/background/BaseGame_BG.atlas");

  await PIXI.Assets.load(["spineboyData", "spineboyAtlas"]);

  const spineboy = Spine.from("spineboyData", "spineboyAtlas", {
    scale: 0.6,
  });
  setTimeout(() => {
    const loaderContainer = document.getElementById('loader');
    loaderContainer.style.display = 'none';
    document.getElementById('game-container').appendChild(app.view);
    spineboy.width = window.innerWidth;
    spineboy.height = window.innerHeight;
    spineboy.position.set(window.innerWidth / 2, window.innerHeight / 2);

    spineboy.name = 'bgSpine';
    spineboy.state.setAnimation(0, 'animation', true)
    app.stage.addChild(spineboy);

    createGameUI(app);

  }, 3000);



}


setup().catch(err => {
  console.error('Error loading assets:', err);
});






export { app };

