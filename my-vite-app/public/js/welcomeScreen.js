import * as PIXI from 'pixi.js'

// container
let welMainContainer;


// Set up textures after loading
let buttonTextureIdle = PIXI.Texture.from('./public/assets/welcome-screen/Continue_Button_Idle.png')
let buttonTextureHover = PIXI.Texture.from('./public/assets/welcome-screen/Continue_Button_Hover.png');
let buttonTexturePressed = PIXI.Texture.from('./public/assets/welcome-screen/Continue_Button_Pressed.png');
// let buttonTextureDisable = PIXI.Texture.from('./public/assets/welcome-screen/Continue_Button_Disabled.png');

function setupWelcomeScreen(app) {

    welMainContainer = new PIXI.Container();
    welMainContainer.name = 'welcomeMainContainer';

    // Create overlay
    const overlay = new PIXI.Graphics();
    overlay.beginFill(0x000000, 0.5); // Black color with 50% opacity
    overlay.drawRect(0, 0, app.screen.width, app.screen.height);
    overlay.endFill();
    overlay.visible = true; // Initially hidden
    overlay.name = 'welcomeContaineroverlay';
    app.stage.addChild(welMainContainer);
    welMainContainer.addChild(overlay);

    // Create logo image
    let welContainer = new PIXI.Container();
    welContainer.name = 'welcomeContainer';
    const welcomeBg = new PIXI.Sprite(PIXI.Loader.shared.resources['welcomeBg'].texture);
    // welContainer.anchor.set(0.5);
    welContainer.scale.set(0.5);
    welContainer.position.set(430, 80)
    // welContainer.position.set(app.screen.width / 4, app.screen.height / 4 + 50)
    welMainContainer.addChild(welContainer);
    welContainer.addChild(welcomeBg);

    // Create button
    // const button = new PIXI.Sprite(PIXI.Loader.shared.resources['contiBtnIdel'].texture);
    const button = new PIXI.Sprite(buttonTextureIdle);
    button.anchor.set(0.5);
    button.position.set(welContainer.width, welContainer.height * 2 + 50);
    button.interactive = true;
    button.buttonMode = true;
    // button.on('pointerdown', () => {
    //     welMainContainer.visible = false;
    // });
    welContainer.addChild(button);
    // Button interactions
    button
    .on('pointerdown', onButtonDown)
    .on('pointerup', onButtonUp)
    .on('pointerupoutside', onButtonUp)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOut);

}






// Function to handle button hover
function onButtonOver() {
    this.texture = buttonTextureHover;
}

// Function to handle button idle (mouse out)
function onButtonOut() {
    this.texture = buttonTextureIdle;
}

// Function to handle button press (mouse down)
function onButtonDown() {
    this.texture = buttonTexturePressed;
    welMainContainer.visible = false;
    
}

// Function to handle button release (mouse up)
function onButtonUp() {
    this.texture = buttonTextureIdle; // Could change to idle texture if needed
}


export { setupWelcomeScreen }