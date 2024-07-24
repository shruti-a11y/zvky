import * as PIXI from 'pixi.js'

const app = new PIXI.Application({
  backgroundColor: 0xffffff,
  resizeTo: window
});
globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.view);

let mainContainer = new PIXI.Container();
app.stage.addChild(mainContainer);
mainContainer.position.set(100,0);



// fucntion to create button with on click functionality
const circleRadius = 40;
const circledia = 80;
const margin = 10;

let numArr = [];
let currentInput = '';
let operator = '' ;
let previousInput = '';
let current_index = 0;

const createBtn = (lable, x, y, onClick) => {
  const btnContainer = new PIXI.Container();
  btnContainer.position.set(x, y);
  const btn = new PIXI.Graphics();
  btn.beginFill(0x000000, 0.6);
  // btn.endFill()
  btn.drawCircle(0, 0, circleRadius);
  btn.interactive = true;
  btn.buttonMode = true;
  btn.on('pointerdown', onClick);

  const btnText = new PIXI.Text(lable, { fill: 0x000000, fontSize: 24 });
  btnText.anchor.set(0.5)
  btnText.position.set(0)

  mainContainer.addChild(btnContainer);
  btnContainer.addChild(btn);
  btnContainer.addChild(btnText);
};

const createDisplay=()=>{
  const display = new PIXI.Graphics();
  display.beginFill(0x000000, 0.6);
  display.drawRect(0,0,500, 60);
  mainContainer.addChild(display);

  const displayText = new PIXI.Text('', { fill: 0x000000, fontSize: 32 });
  displayText.x = margin + 10;
  displayText.y = margin + 10;
  mainContainer.addChild(displayText);

  return displayText;
}
// createDisplay();

const displayText = createDisplay();


const updateDisplay = (text) => {
  displayText.text = text;
};

const onNumberClick = (number) => {
  currentInput += number;
  updateDisplay(currentInput);
  numArr = parseInt(currentInput);
  console.log(numArr);
};

const onOperatorClick = (op) => {
  if (currentInput === '') return;
  previousInput = currentInput;
  currentInput = '';
  operator = op;
  updateDisplay(op);
};

const onEqualClick = () => {
  if (currentInput === '' || previousInput === '') return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result;

  switch (operator) {
      case '+':
          result = num1 + num2;
          break;
      case '-':
          result = num1 - num2;
          break;
      case '*':
          result = num1 * num2;
          break;
      case '/':
          result = num1 / num2;
          break;
  }

  updateDisplay(result);
  currentInput = result.toString();
  previousInput = '';
  operator = '';
};


const buttons = [
  { label: '7', x: margin, y: 100, onClick: () => onNumberClick('7') },
  { label: '8', x: margin + circledia + margin, y: 100, onClick: () => onNumberClick('8') },
  { label: '9', x: margin + 2 * (circledia + margin), y: 100, onClick: () => onNumberClick('9') },
  { label: '/', x: margin + 3 * (circledia + margin), y: 100, onClick: () => onOperatorClick('/') },

  { label: '4', x: margin, y: 200, onClick: () => onNumberClick('4') },
  { label: '5', x: margin + circledia + margin, y: 200, onClick: () => onNumberClick('5') },
  { label: '6', x: margin + 2 * (circledia + margin), y: 200, onClick: () => onNumberClick('6') },
  { label: '*', x: margin + 3 * (circledia + margin), y: 200, onClick: () => onOperatorClick('*') },

  { label: '1', x: margin, y: 300, onClick: () => onNumberClick('1') },
  { label: '2', x: margin + circledia + margin, y: 300, onClick: () => onNumberClick('2') },
  { label: '3', x: margin + 2 * (circledia + margin), y: 300, onClick: () => onNumberClick('3') },
  { label: '-', x: margin + 3 * (circledia + margin), y: 300, onClick: () => onOperatorClick('-') },

  { label: '0', x: margin, y: 400, onClick: () => onNumberClick('0') },
  { label: 'C', x: margin + circledia + margin, y: 400, onClick: () => onClearClick() },
  { label: '=', x: margin + 2 * (circledia + margin), y: 400, onClick: () => onEqualClick() },
  { label: '+', x: margin + 3 * (circledia + margin), y: 400, onClick: () => onOperatorClick('+') },
];

// buttons.forEach(button => createBtn(button.lable, button.x, button.y, button.onClick));

for (let i = 0; i < buttons.length; i++) {
  createBtn(buttons[i].label, buttons[i].x, buttons[i].y, buttons[i].onClick);  
}



