// import { playSpinSound, playLandingSound } from './audio.js';
import { getSpinResult } from './spinResult';
import * as PIXI from 'pixi.js'

let isSpinning = false;
const reels = [];

function createReels(app, reelFrame) {
    const REEL_WIDTH = 160;
    const SYMBOL_SIZE = 150;

    for (let i = 0; i < 5; i++) {
        const reelContainer = new PIXI.Container();
        reelContainer.name = 'reelContainer'+i
        reelContainer.x = i * REEL_WIDTH;
        reelContainer.y = 0;
        reelFrame.addChild(reelContainer);

        const symbols = [];
        for (let j = 0; j < 3; j++) {
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
}

function onSpinButtonClicked(app) {
    if (isSpinning) return;
    isSpinning = true;

    // playSpinSound();

    const DURATION = 4000;
    const SYMBOL_SIZE = 150;
    const targetPositions = [];

    for (let i = 0; i < reels.length; i++) {
        const extra = Math.floor(Math.random() * 3);
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
                symbol.y = (symbol.y + SYMBOL_SIZE) % (SYMBOL_SIZE * 3);
                reel.container.y = -progress * targetPositions[i] % (SYMBOL_SIZE * 3);
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