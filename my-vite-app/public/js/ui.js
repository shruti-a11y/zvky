import { createReels } from './reels.js';
import * as PIXI from 'pixi.js'
import {setupWelcomeScreen} from './welcomeScreen.js'
import {createBtnPanel} from './buttonPanel.js'
import "pixi-spine";


function createGameUI(app) {
    
    let bgContainer = new PIXI.Container();
    bgContainer.name = "backgroundContainer";
    const background = new PIXI.Sprite(PIXI.Loader.shared.resources['background'].texture);
    background.anchor.set(0.5, 0.5);
    app.stage.addChild(bgContainer);
    bgContainer.addChild(background);

    // const spineData = PIXI.Loader.shared.resources['backgroundSpine'].spineData;

    // // Create a Spine animation
    // const animation = new PIXI.spine.Spine(spineData);
    //  animation.state.setAnimation(0, 'animation', true);


    const reelFrame = new PIXI.Container();
    reelFrame.name = "reelFrameContainer"
    reelFrame.x = 100;
    reelFrame.y = 100;
    app.stage.addChild(reelFrame);
    reelFrame.scale.set(0.8);

    const reelFrameCont = new PIXI.Container();
    const reelFrameBg = new PIXI.Sprite(PIXI.Loader.shared.resources['reelFrame'].texture);
    reelFrameCont.position.set(-182, -116)
    reelFrameBg.name = 'reelFrameBg';
    reelFrame.addChild(reelFrameCont);
    reelFrameCont.addChild(reelFrameBg);

    reelFrameCont.scale.set(0.7);


    createReels(app, reelFrame);
    createBtnPanel(app);
    setupWelcomeScreen(app);
}






export { createGameUI };
