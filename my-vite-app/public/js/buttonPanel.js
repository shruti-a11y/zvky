import * as PIXI from 'pixi.js'
import { onSpinButtonClicked } from './reels.js';


let spinBtn;
let info_btn;
let btnMainContainer;
let betContainer;
let winContainer;
let balanceContainer;

// Set up textures after loading
let spin_Idle = PIXI.Texture.from('./public/assets/GameUI/desktop/Spin_Idle.png')
let spin_Hover = PIXI.Texture.from('../public/assets/GameUI/desktop/Spin_Hover.png');
let spin_Pressed = PIXI.Texture.from('../public/assets/GameUI/desktop/Spin_Pressed.png');
let spin_Disable = PIXI.Texture.from('../public/assets/GameUI/desktop/Spin_Disabled.png');
let info_Idle = PIXI.Texture.from('./public/assets/GameUI/desktop/Info_Idle.png')
let info_Hover = PIXI.Texture.from('../public/assets/GameUI/desktop/Info_Hover.png');
let info_Pressed = PIXI.Texture.from('../public/assets/GameUI/desktop/Info_Pressed.png');
let info_Disable = PIXI.Texture.from('../public/assets/GameUI/desktop/Info_Disabled.png');

function createBtnPanel(app) {

    btnMainContainer = new PIXI.Container();
    btnMainContainer.name = 'btnMainContainer';

    // msg bar
    let Frame = new PIXI.Sprite(PIXI.Loader.shared.resources['frameSmall'].texture);
    Frame.position.set(95, 466);
    Frame.scale.set(1.7, 0.6);
    btnMainContainer.addChild(Frame);

    const msgBar_Text = new PIXI.Text('GOOD LUCKS', {fontSize: 30, fill: '#FFFFFF', fontWeight:700 });
    
    msgBar_Text.position.set(310, 474);
    btnMainContainer.addChild(msgBar_Text);

    // spin button
    spinBtn = new PIXI.Sprite(spin_Idle);
    spinBtn.name = 'spin_';
    spinBtn.anchor.set(0.5);
    spinBtn.scale.set(0.4);
    spinBtn.x = 689;
    spinBtn.y = 520;
    spinBtn.interactive = true;
    spinBtn.buttonMode = true;
    spinBtn.on('pointerdown', () => {
        onSpinButtonClicked(app)
    });
    app.stage.addChild(btnMainContainer);
    btnMainContainer.addChild(spinBtn);
    spinBtn.on('pointerupoutside',()=>{
        onButtonUp(e)
    } )
    spinBtn.on('pointerover',(e)=>{
        onButtonOver(e)
    } )
    spinBtn.on('pointerout',(e)=>{

        onButtonOut(e)
    } );


    // INFO button
    info_btn = new PIXI.Sprite(info_Idle);
    info_btn.name = 'info_';
    
    info_btn.anchor.set(0.5);
    info_btn.scale.set(0.5);
    info_btn.x = 107.5;
    info_btn.y = 541;
    info_btn.interactive = true;
    info_btn.buttonMode = true;
    app.stage.addChild(btnMainContainer);
    btnMainContainer.addChild(info_btn);
    info_btn.on('pointerupoutside', ()=>{
        onButtonUp(e)
    } )
    info_btn.on('pointerover', (e)=>{
        onButtonOver(e)
    } )
    info_btn.on('pointerout', (e)=>{

        onButtonOut(e)
    });
    info_btn.on('pointerdown', (e)=>{
        onButtonPress(e)
    });




    // bet button
    betContainer = new PIXI.Container();
    betContainer.name = 'betContainer';
    betContainer.y = app.view.height - 110;
    betContainer.x = 485;
    betContainer.scale.set(0.4)

    let smallFrame = new PIXI.Sprite(PIXI.Loader.shared.resources['frameSmall'].texture);
    smallFrame.y= -3
    smallFrame.scale.y= 1.1;
    let arrowDownIdle = new PIXI.Sprite(PIXI.Loader.shared.resources['arrowDownIdle'].texture);
    let arrowUpIdle = new PIXI.Sprite(PIXI.Loader.shared.resources['arrowUpIdle'].texture);
    let Bet_Text = new PIXI.Sprite(PIXI.Loader.shared.resources['Bet_Text'].texture);
    const bet_value = new PIXI.Text('1.00', { fontSize: 30, fill: '#FFFFFF',fontWeight:700 });
    arrowDownIdle.y = -11;
    arrowDownIdle.x = -13;
    arrowDownIdle.scale.set(1.1)

    arrowUpIdle.y = -11;
    arrowUpIdle.x = 296;
    arrowUpIdle.scale.set(1.1)

    Bet_Text.x = 111.5;
    Bet_Text.y = 12;


    bet_value.x = 169;
    bet_value.y = 43;

    btnMainContainer.addChild(betContainer);
    betContainer.addChild(smallFrame);
    betContainer.addChild(arrowDownIdle);
    betContainer.addChild(arrowUpIdle);
    betContainer.addChild(Bet_Text);
    betContainer.addChild(bet_value);


    // win button
    winContainer = new PIXI.Container();
    winContainer.name = 'winContainer';
    winContainer.y = app.view.height - 110;
    winContainer.x = 317;
    winContainer.scale.set(0.4)
    let smallFrame2 = new PIXI.Sprite(PIXI.Loader.shared.resources['frameSmall'].texture);
    smallFrame2.y= -3
    smallFrame2.scale.y= 1.1;
    let Win_Text = new PIXI.Sprite(PIXI.Loader.shared.resources['Win_Text'].texture);
    const win_value = new PIXI.Text('0.00', { fontSize: 30, fill: '#FFFFFF', fontWeight:700 });

    Win_Text.x = 100.5;
    Win_Text.y = 12;

    win_value.x = 160;
    win_value.y = 43;
    btnMainContainer.addChild(winContainer);
    winContainer.addChild(smallFrame2);
    winContainer.addChild(Win_Text);
    winContainer.addChild(win_value);


    // balance button
    balanceContainer = new PIXI.Container();
    balanceContainer.name = 'balanceContainer';
    balanceContainer.y = app.view.height - 110;
    balanceContainer.x = 144;
    balanceContainer.scale.set(0.4)
    let smallFrame3 = new PIXI.Sprite(PIXI.Loader.shared.resources['frameSmall'].texture);
    smallFrame3.y= -3
    smallFrame3.scale.y= 1.1;
    let Balance_Text = new PIXI.Sprite(PIXI.Loader.shared.resources['Balance_Text'].texture);
    const balance_value = new PIXI.Text('10000.00', { fontSize: 30, fill: '#FFFFFF',fontWeight:700 });
    Balance_Text.x = 100.5;
    Balance_Text.y = 12;

    balance_value.x = 130;
    balance_value.y = 43;
    btnMainContainer.addChild(balanceContainer);
    balanceContainer.addChild(smallFrame3);
    balanceContainer.addChild(Balance_Text);
    balanceContainer.addChild(balance_value);

}

// Function to handle button hover
function onButtonOver(evt) {
    let btnName =  evt.currentTarget.name;
    let btn = evt.currentTarget;
    if(btnName == 'info_'){
        btn.texture = info_Hover;
    }
    else{
        btn.texture = spin_Hover;
    }
}

// Function to handle button idle (mouse out)
function onButtonOut(evt) {
    let btnName =  evt.currentTarget.name;
    let btn = evt.currentTarget;
    if(btnName == 'info_'){
        btn.texture = info_Idle;
    }
    else{
        btn.texture = spin_Idle;
    }
}

// Function to handle button release (mouse up)
function onButtonUp(evt) {
        let btnName =  evt.currentTarget.name;
        let btn = evt.currentTarget;
    if(btnName == 'info_'){
        btn.texture = info_Pressed;
        
    }
    else{
        btn.texture = spin_Pressed;
    } 
}
// Function to handle button release (mouse up)
function onButtonPress(evt) {
    let btnName =  evt.currentTarget.name;
        let btn = evt.currentTarget;
    if(btnName == 'info_'){
        btn.texture = info_Pressed;
    }
    else{
        btn.texture = spin_Pressed;
    }// Could change to idle texture if needed
}

export { createBtnPanel }