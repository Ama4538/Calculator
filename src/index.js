import './style/style.css'

const funcationalBtn = document.querySelectorAll(`.funcationalBtn`);
const operationalBtn = document.querySelectorAll(`.operationalBtn`);
const display = document.querySelectorAll(`.display`);

const clearBtn = document.getElementById(`clear`);
const equalBtn = document.getElementById(`equal`);
const lastContent = document.getElementById(`lastContent`);
const currentInput = document.getElementById(`currentInput`);
const decimalBtn = document.getElementById(`decimalBtn`);
const percentBtn = document.getElementById(`percentBtn`);
const plusminusBtn = document.getElementById(`plus&minusBtn`);
//Counter to prevent operation spamming
let operationCount = 1;
let stepCount = 0;
let decmialCount = 0;

//Special btn section
clearBtn.onclick = () => {
    for (let i = 0; i < display.length; i++) {
        display[i].textContent = "";
    }
    lastContent.style.display = "none";

    decmialCount = 0;
};

equalBtn.onclick = () => {
    lastContent.style.display = "flex";
    if (operationCount === 1) {
        var length = currentInput.textContent.length;
        lastContent.textContent = `${currentInput.textContent.substring(0, length- 2)} = `;
        operationCount--;
    }
    else {
        lastContent.textContent = `${currentInput.textContent} =`;
    }

    currentInput.textContent = `${performOperation(currentInput.textContent)}`;
    stepCount++;
    decmialCount = 0;
};

decimalBtn.onclick = () => {
    if (decmialCount === 0 && currentInput.textContent.length == 0) {
        currentInput.textContent = `0.`;
    }
    else if (decmialCount === 0) {
        currentInput.textContent = `${currentInput.textContent}.`;
    }
     decmialCount++;
};

percentBtn.onclick = () => {
    if (!isNaN(Number(currentInput.textContent))) {
        currentInput.textContent = `${(Number(currentInput.textContent) / 100)}`
    }
};

plusminusBtn.onclick = () => {
    if (!isNaN(Number(currentInput.textContent))) {
        currentInput.textContent = `${(Number(currentInput.textContent) * -1)}`;
    }
};

//Adds functions to normal buttons
function addBtn () {
    //Number Btn
    currentInput.textContent = "";
    for (let i = 0; i < funcationalBtn.length; i++) {
        funcationalBtn[i].addEventListener('click', (e) => {
            currentInput.textContent = `${currentInput.textContent}${e.target.value}`;
            operationCount = 0;
        }, false);
    } 
    //Operational Btn
    for (let i = 0; i < operationalBtn.length; i++) {
        operationalBtn[i].addEventListener('click', (e) => {
            if (operationCount === 0) {
                currentInput.textContent = `${currentInput.textContent} ${e.target.value} `;
            }
            else if (operationCount === 1) {
                var length = currentInput.textContent.length;
                currentInput.textContent = `${currentInput.textContent.substring(0, length- 2)} ${e.target.value} `;
                operationCount--;
            }
            
            decmialCount = 0;
            operationCount++;
        }, false);
    }

};

//Convert display content into array in order to finder number and operation
function performOperation(input) {
    let finder = input.split(" ");
    let total = 0;
    let currentNumber;
    let operation = "";
    if (!isNaN(Number(finder[0]))) {
        total = finder[0];
    }

    for (var i = 1; i < finder.length; i++) {
        if (isNaN(Number(finder[i]))) {
            operation = finder[i];
        }

        else {
            currentNumber = finder[i]
            total = doOperation(Number(total), Number(currentNumber), operation);
        }
    }
    
    if (isFinite(total)) {
            return total
    }

    return "Cannot Divide by 0";
}

//Perform the acutal operation
function doOperation(total, currentNumber, operation) {
    let divideHolder = 0;
    if (operation == "x") {
        return total * currentNumber;
    }
    else if (operation == "+") {
        return total + currentNumber;
    }
    else if (operation == "-") {
        return total - currentNumber;
    }
    else
        divideHolder = total / currentNumber;
        if (divideHolder.toString().indexOf(".")) {
            return divideHolder.toFixed(2);
        }
        return divideHolder; 
}

addBtn();

