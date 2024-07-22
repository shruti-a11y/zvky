import * as PIXI from 'pixi.js'

let betContainer;
let winContainer;
let balanceContainer;
let Bet_Text;
let currInd = 2;

const betArr = [0.2,0.5,1,2,5,10];

function createButtonUI(app, btnMainContainer) {

    // msg bar
    let Frame = new PIXI.Sprite(PIXI.Loader.shared.resources['frameSmall'].texture);
    Frame.position.set(95, 466);
    Frame.scale.set(1.7, 0.6);
    btnMainContainer.addChild(Frame);

    const msgBar_Text = new PIXI.Text('GOOD LUCKS', { fontSize: 30, fill: '#FFFFFF', fontWeight: 700 });

    msgBar_Text.position.set(310, 474);
    btnMainContainer.addChild(msgBar_Text);

    // bet button
    betContainer = new PIXI.Container();
    betContainer.name = 'betContainer';
    betContainer.y = app.view.height - 110;
    betContainer.x = 485;
    betContainer.scale.set(0.4)

    let smallFrame = new PIXI.Sprite(PIXI.Loader.shared.resources['frameSmall'].texture);
    smallFrame.y = -3
    smallFrame.scale.y = 1.1;
    let arrowDownIdle = new PIXI.Sprite(PIXI.Loader.shared.resources['arrowDownIdle'].texture);
    let arrowUpIdle = new PIXI.Sprite(PIXI.Loader.shared.resources['arrowUpIdle'].texture);
    Bet_Text = new PIXI.Sprite(PIXI.Loader.shared.resources['Bet_Text'].texture);
    const bet_value = new PIXI.Text('1.00', { fontSize: 30, fill: '#FFFFFF', fontWeight: 700 });

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
    smallFrame2.y = -3
    smallFrame2.scale.y = 1.1;
    let Win_Text = new PIXI.Sprite(PIXI.Loader.shared.resources['Win_Text'].texture);
    const win_value = new PIXI.Text('0.00', { fontSize: 30, fill: '#FFFFFF', fontWeight: 700 });

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
    smallFrame3.y = -3
    smallFrame3.scale.y = 1.1;
    let Balance_Text = new PIXI.Sprite(PIXI.Loader.shared.resources['Balance_Text'].texture);
    const balance_value = new PIXI.Text('10000.00', { fontSize: 30, fill: '#FFFFFF', fontWeight: 700 });
    Balance_Text.x = 100.5;
    Balance_Text.y = 12;

    balance_value.x = 130;
    balance_value.y = 43;
    btnMainContainer.addChild(balanceContainer);
    balanceContainer.addChild(smallFrame3);
    balanceContainer.addChild(Balance_Text);
    balanceContainer.addChild(balance_value);



    // bet btn function
    arrowDownIdle.interactive = true;
    arrowDownIdle.buttonMode = true;

    arrowUpIdle.interactive = true;
    arrowUpIdle.buttonMode = true;

    arrowUpIdle.on('pointerdown', betIncrease);
    arrowDownIdle.on('pointerdown', betDecrease);

    function betIncrease() {  
        if(currInd< betArr.length-1){
            currInd += 1
            let newText =betArr[currInd];
            bet_value.text = newText;
        }
        else{
            console.log("xx: btn disbale");
        }   

    }
    function betDecrease() {  
        if(currInd> 0){
            currInd -= 1
            let newText =betArr[currInd];
            bet_value.text = newText;
        }
        else{
            console.log("xx: btn disbale");
        }   

    }


}

export { createButtonUI }