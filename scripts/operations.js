let docInput = document.querySelector("#input");
let docEquation = document.querySelector("#equation");

let numList = document.querySelectorAll(".number");
let operatorList = document.querySelectorAll(".operations");
let parenthesisList = document.querySelectorAll(".parenthesis");

let remainder = false;
let pCount = 0;
let equation = [];
let historyEquation = [];
let historyResult = [];

for(e of numList) {
    e.addEventListener('click', function(event) {
        addNumber(this.value);
    });
};

for(e of operatorList) {
    e.addEventListener('click', function(event) {
        addOperator(this.value);
    });
};

for(e of parenthesisList) {
    e.addEventListener('click', function(event) {
        addParenthesis(this.value);
    })
}

function addNumber(num) {
    if(remainder == true) {
        docEquation.value = '';
        docInput.value = '';
        remainder = false;
    }    
    if(num == '.' && docInput.value.includes('.')) {
        return;
    }
    else if(num == '0' && docInput.value == '') {
        return;
    }

    docInput.value += num;
    isNum = true;
}

function addOperator(operator) {
    if(remainder == true) {
        remainder = false;
        docEquation.value = '';
    }
    let last = equation[equation.length - 1];
    if(docInput.value == '' && isNaN(last) == true && last != ')') {
        if(last != '(') {
            equation.pop();
            docEquation.value = docEquation.value.substring(0, docEquation.value.length - 1);
        }
        else {
            return;
        }
    }
    else if(docInput.value != '') {
        if(last == ')') {
            equation.push('*');
        }
        equation.push(docInput.value);
        docEquation.value += docInput.value;
    }
    equation.push(operator);
    docEquation.value += operator;
    docInput.value = '';
}

function addParenthesis(parenthesis) {
    if(remainder == true) {
        remainder = false;
        docEquation.value = '';
        docInput.value = '';
    }
    let last = equation[equation.length - 1];
    if(parenthesis == '(') {
        pCount++;
        if(docInput.value != '') {
            equation.push(docInput.value);
            docEquation.value += docInput.value;
            equation.push('*');
        }
        equation.push(parenthesis);
        docEquation.value += parenthesis;
        docInput.value = '';
        
    }
    else {
        if(pCount > 0 && (last != '(' || docInput.value != '')) {
            pCount--;
            if(docInput.value != '') {
                equation.push(docInput.value);
                docEquation.value += docInput.value;
            }
            equation.push(parenthesis);
            docEquation.value += parenthesis;
            docInput.value = '';    
                    
        }
    }
}

function clearInput() {
    docInput.value = '';
    docEquation.value = '';
    remainder = false;
    equation = [];
}

function backspace() {
    if(remainder == true) {
        return;
    }
    docInput.value = docInput.value.substring(0, docInput.value.length - 1);
}

function addHistory() {
    if(historyEquation.length > 5) {
        historyEquation.shift();
        historyResult.shift();
    }
    historyEquation.push(docEquation.value);
    historyResult.push(docInput.value);
}

function evaluateEquation() {
    if(docInput.value != '') {
        equation.push(docInput.value);
        docEquation.value += docInput.value;
        docInput.value = '';
    }

    console.log(`Equation Infix: ${equation}`)
    equation = infixPostfixConversion();
    console.log(`Equation Postfix: ${equation}`);
    docEquation.value += '=';
    if(equation.length == 0) {
        docInput.value = "INPUT ERROR";
        remainder = false;
    }
    else {
        let temp = [];
        while(equation.length != 0) {
            let current = equation[0];
            if(isNaN(current) == false) {
                temp.push(equation.shift())
            }
            else if(current == '*' || current == '/' || current == '-' || current == '+') {
                let a = temp.pop();
                let b = temp.pop();
                temp.push(eval(`${b}${current}${a}`));
                console.log(`${b} ${current} ${a} = ${temp[temp.length - 1]}`)
                equation.shift();
            }
            else {
                break;
            }
        }
        console.log(`Final Answer: ${temp[0]}`)
        docInput.value = temp.pop();
        addHistory();
    }

    equation = [];
    remainder = true;
        
}

function infixPostfixConversion() {
    let postfixStack = ['('];
    let ePostfix = [];
    equation.push(')');

    while(equation.length != 0) {
        let current = equation[0];

        if(current == '(') {
            postfixStack.push(equation.shift());
        }
        else if(isNaN(current) == false) {
            ePostfix.push(equation.shift());
        }
        else if(current == '*' || current == '/' || current == '-' || current == '+') {
            while(precedence(current) <= precedence(postfixStack[postfixStack.length - 1])) {
                ePostfix.push(postfixStack.pop());
            }
            postfixStack.push(equation.shift());
        }
        else if(current == ')') {
            while(postfixStack[postfixStack.length - 1] != '(') {
                ePostfix.push(postfixStack.pop());
            }
            postfixStack.pop();
            equation.shift();
        }
        else {
            ePostfix = [];
            break;
        }
    }

    return ePostfix;
}

function precedence(symbol) {
    switch(symbol) {
        case '^':
            return 3;
        case '*':
        case '/':
            return 2;
        case '+':
        case '-':
            return 1;
        default:
            return 0;
    }
}

function toggleHistory() {
    
}