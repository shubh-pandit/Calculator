var prevSolution = null;
var operation = null;
var currentDisplayBottom = null;
var currentDisplayTop = null;
const maxLength = 11;
var calculator = {
    operandFlag1 : false,
    operandFlag2 : false,
    decimalFlag : false,
    operationFlag : false,
    waitingForDecimalFlag : false,
    operationCompleteFlag : false,
};

const numKeyCodes = {
    49 : '1',
    50 : '2',
    51 : '3',
    52 : '4',
    53 : '5',
    54 : '6',
    55 : '7',
    56 : '8',
    57 : '9',
    48 : '0',
    46 : '.',
};

const operationKeyCodes = {
    45 : '-',
    43 : '+',
    47 : '÷',
    42 : '×',

}

const functionKeyCodes = {
    61 : '=',
    13 : '=',
}

function add(operand1, operand2){
    return operand1+operand2;
}
function subtract(operand1,operand2){
    return operand1-operand2;
}
function divide(operand1,operand2){
    return operand1/operand2;
}
function multiply(operand1,operand2){
    return operand1*operand2;
}
function signchange(operand1){
    if(operand1) return -operand1;
    else return 0;
}
function updateDisplayBottom(value){
    var container = document.querySelector('.display2');
    container.textContent = value;
    currentDisplayBottom = container.textContent;
}
function updateDisplayTop(value){
    const container = document.querySelector('.display');
    container.textContent = value;
    currentDisplayTop = container.textContent;
}
function clrscr(){
    updateDisplayBottom('');
    updateDisplayTop('');
    for(let key in calculator)
        calculator[key] = false;
}


function compValues(a, b, c, d){
    return (calculator.operandFlag1 == a && calculator.operandFlag2 == b && calculator.operationFlag == c && calculator.decimalFlag == d);
}

function backspace(){

    if(currentDisplayBottom && calculator.waitingForDecimalFlag == true && calculator.decimalFlag == true){
        updateDisplayBottom(currentDisplayBottom.substr(0,currentDisplayBottom.length-1));
        calculator.waitingForDecimalFlag = false;
        calculator.decimalFlag = false;
        console.log('here');
        
    }
    else if(currentDisplayBottom){
        updateDisplayBottom(currentDisplayBottom.substr(0,currentDisplayBottom.length-1));
    }
    
    if(currentDisplayBottom.includes('.'))
            calculator.decimalFlag = true;
            if(currentDisplayBottom[currentDisplayBottom.length] == '.')
            calculator.waitingForDecimalFlag = true;
    else
        calculator.decimalFlag = false;

    
        
}

function signChangeDisplay(){
    updateDisplayBottom(operate('signchange'),currentDisplayBottom);
}

function updateNumericalValues(value){

    if(compValues(false,false,false,false)&&value!='0'){
        if(value == '.'){
            updateDisplayBottom('0.');
            calculator.decimalFlag = true;
            calculator.waitingForDecimalFlag = true;
            calculator.operandFlag1 = true;
        }
        else{
            updateDisplayBottom(value);
            calculator.operandFlag1 = true;
            
        }
        

    }
    else if(compValues(true,false,false,false)){
        updateDisplayBottom(currentDisplayBottom + value);
        if(value == '.'){
            calculator.decimalFlag = true;
            calculator.waitingForDecimalFlag = true;
        }
    }
    else if(compValues(true,false,false,true)){
        if(value != '.'){
            updateDisplayBottom(currentDisplayBottom + value);
            if(calculator.waitingForDecimalFlag)
                calculator.waitingForDecimalFlag = false;
        }
    }
    else if(compValues(false,false,false,true)){
        if(value != '.'){
            updateDisplayBottom(currentDisplayBottom + value);
            calculator.operandFlag1 = true;
            if(calculator.waitingForDecimalFlag)
                calculator.waitingForDecimalFlag = false;
        }
    }
    else if(compValues(true, false, true, true)){
        if(value != '.'){
            updateDisplayBottom(currentDisplayBottom + value);
            calculator.operandFlag2 = true;
            if(calculator.waitingForDecimalFlag)
                calculator.waitingForDecimalFlag = false;
        }
    }
    else if(compValues(true, false, true, false)){
        if(value == '.'){
            updateDisplayBottom('0.');
            calculator.decimalFlag = true;
            calculator.waitingForDecimalFlag = true;
            calculator.operandFlag2 = true;
        }
        else{
            updateDisplayBottom(value);
            calculator.operandFlag2 = true;
            
        }
    }
    else if(compValues(true, true, true, false)){
        updateDisplayBottom(currentDisplayBottom + value);
        if(value == '.'){
            calculator.decimalFlag = true;
            calculator.waitingForDecimalFlag = true;
        }
    }
    else if(compValues(true, true, true, true)){
        if(value != '.'){
            updateDisplayBottom(currentDisplayBottom + value);
            if(calculator.waitingForDecimalFlag)
                calculator.waitingForDecimalFlag = false;
        }
    }

}
function operate(value, o1 = currentDisplayTop, o2 = currentDisplayBottom){
    
    let operand1,operand2;
    if(o1) operand1  = parseFloat(o1.substr(0, o1.length - 1));
    if(o2) operand2 = parseFloat(o2);
    var sol; 
    if(value == '×')
        sol = multiply(operand1, operand2);
    else if(value == '+')
        sol = add(operand1, operand2);
    else if(value == '-')
        sol = subtract(operand1, operand2);
    else if(value == '=')
        sol = operand1;
    else if(value == 'signchange')
        sol = signchange(operand2);
    else
        sol = divide(operand1, operand2);
    prevSolution = sol;
    sol = sol.toString();
    console.log(operand1 + '  ' + operand2)
    return sol;
}
function updateOperationValues(value){
    if(compValues(false,false,false,false)){
            updateDisplayTop('0' + value);
            updateDisplayBottom(value);
            calculator.operandFlag1 = true;
            calculator.operationFlag = true;
            operation = value;
            
        
    }
    else if(compValues(true, false, false, false)){
        calculator.operationFlag = true;
        updateDisplayTop(currentDisplayBottom + value);
        updateDisplayBottom(value);
        operation = value;
        
    }
    else if(compValues(true, false, true, false)){
        updateDisplayBottom(value); 
        updateDisplayTop(currentDisplayTop.substr(0,currentDisplayTop.length - 1) + value);
        operation = value;

    }
    else if(compValues(true, false, false, true)){
        if(calculator.waitingForDecimalFlag){
            updateDisplayTop(currentDisplayBottom.substr(0,currentDisplayBottom.length - 1) + value);
        }
        else
            updateDisplayTop(currentDisplayBottom + value);
        calculator.waitingForDecimalFlag = false;
        calculator.decimalFlag = false;
        calculator.operationFlag = true;
        updateDisplayBottom(value); 
        operation = value;
    }
    else if(compValues(true, true, true, false)){
        let x = operate(operation);
        updateDisplayTop(x + value);
        updateDisplayBottom('');
        calculator.operandFlag2 = false;
        operation = value;

    }
    else if(compValues(true, true, true, true)){
        let x = operate(operation);
        updateDisplayTop(x + value);
        updateDisplayBottom('');
        calculator.waitingForDecimalFlag = false;
        calculator.decimalFlag = false;
        calculator.operandFlag2 = false;
        operation = value;
    }
    else if(compValues(true, false, true, true)){
        updateDisplayBottom(value);
        updateDisplayTop(currentDisplayTop.substr(0,currentDisplayTop.length - 1) + value);
        operation = value;
    }

}

function handleFunctions(value){
    for(let key in calculator)
        console.log(key + '=' + calculator[key]);
    if(value == '='){
        if(calculator.waitingForDecimalFlag){
            currentDisplayBottom = currentDisplayBottom.substr(0,currentDisplayBottom.length - 1);
            calculator.waitingForDecimalFlag = false;
            calculator.decimalFlag = false;
        }
        if(compValues(true, true, true, true)){

            updateDisplayBottom(operate(operation));
            updateDisplayTop('');
            calculator.operandFlag2 = false;
            calculator.operationFlag = false;
            calculator.operationCompleteFlag = true;
            
        }
        else if((compValues(true, true, true, false))){
            updateDisplayBottom(operate(operation));
            updateDisplayTop('');
            calculator.operandFlag2 = false;
            calculator.operationFlag = false;
            calculator.operationCompleteFlag = true;
        }
        else if(compValues(true, false, true, true)){
            updateDisplayBottom(operate('='));
            updateDisplayTop('');
            calculator.operandFlag2 = false;
            calculator.operationFlag = false;
        }
        else if(compValues(true, false, true, false)){
            updateDisplayBottom(operate('='));
            updateDisplayTop('');
            calculator.operandFlag2 = false;
            calculator.operationFlag = false;

        }
        if(prevSolution)
            if(!isNaN(prevSolution) && prevSolution.toString().indexOf('.') != -1){
                calculator.decimalFlag = true;
            }
    }
    else if(value == 'clrscr'){
        clrscr();
    }
    else if(value == 'backspace'){
        backspace();

    }
    else if(value == 'signchange'){
        signChangeDisplay();
    }
}





const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {

    button.addEventListener('click', (e) => {

        if(calculator.operationCompleteFlag)
            clrscr();
        
        if(button.className == 'numbers' || button.className == 'number0'){
            updateNumericalValues(button.value);

        }
        else if(button.className == 'operations'){
            updateOperationValues(button.value);

        }
        else if(button.className == 'functions'){
            handleFunctions(button.value);
        }
        if(currentDisplayBottom.length > maxLength){
            alert('Maximum String Length is 10');
            updateDisplayBottom(currentDisplayBottom.substr(0,currentDisplayBottom.length - 1));
        }

    });
}
)

document.addEventListener('keypress', (e) => {
    if(e.keyCode in numKeyCodes){
        if(calculator.operationCompleteFlag)
            clrscr();
        updateNumericalValues(numKeyCodes[e.keyCode]);
        
    }
    else if(e.keyCode in operationKeyCodes){
        if(calculator.operationCompleteFlag)
            clrscr();
        updateOperationValues(operationKeyCodes[e.keyCode]);
    }
    else if(e.keyCode in functionKeyCodes){
        if(calculator.operationCompleteFlag)
            clrscr();
        handleFunctions(functionKeyCodes[e.keyCode]);
    }
    if(currentDisplayBottom.length > maxLength){
        alert('Maximum String Length is 10');
        updateDisplayBottom(currentDisplayBottom.substr(0,currentDisplayBottom.length - 1));
    }
})

document.addEventListener('keydown', (e) => {
    if(e.keyCode == '8'){
        if(calculator.operationCompleteFlag)
            clrscr();
        handleFunctions('backspace');
    }
})