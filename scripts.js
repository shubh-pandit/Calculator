var operand1 = null;
var operand2 = null;
var operation = null;
var displayTop = null;
var displayBottom = "0";
var decimalFlag = false;
var addDecimal = false;
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
    return -operand1;
}
function showDisplayBottom(value){
    const container = document.querySelector('display2').textContent;
    if(operand1&&!(operation)){
            if(value == '.'){
                if(!(decimalFlag)){
                container+=value;
                decimalFlag = true;
                }
            }
            else
                container += value;
    }
    else if(!(operand1)&&!(operation)){
        if(value == '.'&&!(decimalFlag)){
            container = '0' + '.';
            decimalFlag = true;
        }
        else container = value;
    }
    else if(operand1&&operation){
        container = valueToSymbol(value); 
    }
}
function handleOperand1(value){
    
    if(operand1){
        if(value == '.'&&(!decimalFlag)){
            addDecimal = true;
        }
        else{
            if(addDecimal){
                let temp = operand1.toString();
                temp = temp + '.' + value;
                operand1 = parseFloat(temp);
                addDecimal = false;
            }
            else{
                let temp = operand1.toString();
                temp = temp + value;
                operand1 = parseFloat(temp);
            }

        }
    }
    else{
        if(value == '.'){
            operand1 = 0;
            addDecimal = true;
        }
        else{
            operand1 = parseFloat(value);
        }
    }
    showDisplayBottom(value);
}
function valueToSymbol(){
    if(value == 'divide')
    return '÷';
    else if(value == 'multiply')
    return '×';
    else if(value =='subtract')
    return '-';
    else if(value =='add')
    return '+';
    else
    return '=';
}
function removeDecimalFromDisplayBottom(){
    const container = document.querySelector('display2').textContent;
    container = container.substring(0, container.length - 1);
}
function showDisplayTop(value){
    const container = document.querySelector('display').textContent;
    container = operand1.toString() + valueToSymbol(value);

}
function handleOperation(value){
    if(addDecimal){
        removeDecimalFromDisplayBottom();
        addDecimal = false;
    }
    if(operation){
        operation = value;
    }
    else{
        operation = value;
        showDisplayBottom(value);
        showDisplayTop(value);
    }

    
}



const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {

    button.addEventListener('click', (e) => {

        if(button.className == 'numbers' || button.className == 'number0'){
            if(operation){
                handleOperand2(button.value);
            }
            else{
                handleOperand1(button.value);
                console.log("here");
            }

        }
        else if(button.className == 'operations'){
            if(operand1){
                handleOperation(button.value);
            }

        }
        else if(button.className == 'functions'){
            handleFunctions(button.value);
        }

    });
}
)