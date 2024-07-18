// import { playSpinSound, playLandingSound } from './audio.js';
import { getSpinResult } from './spinResult';
import * as PIXI from 'pixi.js'

let isSpinning = false;
const reels = [];
const reelMainContainer = new PIXI.Container() ;


function createReels(app, reelFrame) {
    const REEL_WIDTH = 160;
    const SYMBOL_SIZE = 150;
    reelMainContainer.name = 'reelMainContainer'
    reelFrame.addChild(reelMainContainer);

    for (let i = 0; i < 5; i++) {
        const reelContainer = new PIXI.Container();
        reelContainer.name = 'reelContainer'+i
        reelContainer.x = i * REEL_WIDTH;
        reelContainer.y = 0;
        reelMainContainer.addChild(reelContainer);

        const symbols = [];
        for (let j = -1; j < 4; j++) {
            const randomSymbolIndex = Math.floor(Math.random() * 12) + 1;
            let sym = 'symbol'+ randomSymbolIndex;
            const symbol = new PIXI.Sprite(PIXI.Loader.shared.resources[sym].texture);
            symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbols.push(symbol);
            reelContainer.addChild(symbol);
        }
        reelContainer.y = 0;
        reels.push({ container: reelContainer, symbols });
    }

    app.ticker.add(() => {
        for (let i = 0; i < reels.length; i++) {
            const reel = reels[i];
            for (let j = 0; j < reel.symbols.length; j++) {
                const symbol = reel.symbols[j];
                // update symbol positions here
            }
        }
    });

        // Create and add the mask
    const reelMask = new PIXI.Graphics();
    reelMask.name = "reelMask"
    reelMask.beginFill(0xFFFFFF);
    reelMask.drawRect(200, 100, 792, 360); // Adjust size to match your reel area
    reelMask.endFill();
    reelMask.visible = true
    // reelMainContainer.addChild(reelMask);
    reelMainContainer.mask = reelMask;
}

function onSpinButtonClicked(app) {
    if (isSpinning) return;
    isSpinning = true;

    // playSpinSound();

    const DURATION = 4000;
    const SYMBOL_SIZE = 150;
    const targetPositions = [];

    for (let i = 0; i < reels.length; i++) {
        const extra = Math.floor(Math.random() * 5);
        const target = reels[i].symbols[0].y + (SYMBOL_SIZE * 10) + extra * SYMBOL_SIZE;
        targetPositions.push(target);
    }

    const startTime = Date.now();
    function spinReels() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / DURATION, 1);

        for (let i = 0; i < reels.length; i++) {
            const reel = reels[i];
            for (let j = 0; j < reel.symbols.length; j++) {
                const symbol = reel.symbols[j];
                symbol.y = (symbol.y + SYMBOL_SIZE) % (SYMBOL_SIZE * 5);
                reel.container.y = -progress * targetPositions[i] % (SYMBOL_SIZE * 5);
                if(reel.container.y < -145){
                    reel.container.y = 0;
                }
            }
        }

        if (progress < 1) {
            requestAnimationFrame(spinReels);
        } else {
            onReelsStopped(app);
        }
    }
    spinReels();
}

function onReelsStopped(app) {
    isSpinning = false;
    // playLandingSound();

    for (let i = 0; i < reels.length; i++) {
        const reel = reels[i];
        for (let j = 0; j < reel.symbols.length; j++) {
            const symbol = reel.symbols[j];
            // Add landing animations for symbols
            // app.ticker.add(() => {
            //     symbol.rotation += 0.1; // Example animation
            // });
        }
    }
}

export { createReels, onSpinButtonClicked };
