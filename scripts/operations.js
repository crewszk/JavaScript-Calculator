let docInput = document.querySelector("#input");
let docEquation = document.querySelector("#equation");

let numList = document.querySelectorAll(".number");
let operatorList = document.querySelectorAll(".operations");
let parenthesisList = document.querySelectorAll(".parenthesis");

let period = false;
let remainder = false;
let pCount = 0;
let equation = [];
let eCount = 0;
let historyEquation = [];
let historyResult = [];
let historyCount = 0;

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
    if(num == '.' && period == true) {
        return;
    }
    else if(num == '.') {
        period = true;
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
        docInput.value = '';
    }
    let last = docEquation.value.charAt(docEquation.value.length - 1);
    if(docInput.value == '' && !(last >= '0' && last <= '9') && last != ')') {
        return;
    }
    else {
        if(docInput.value != '') {
            equation[eCount++] = docInput.value;
            docEquation.value += docInput.value;
        }
        equation[eCount++] = operator;
        docEquation.value += operator;
        docInput.value = '';
        period = false;
    }
}

function addParenthesis(parenthesis) {
    if(remainder == true) {
        remainder = false;
        docEquation.value = '';
        docInput.value = '';
    }
    let last = docEquation.value.charAt(docEquation.value.length - 1);
    if(parenthesis == '(') {
        pCount++;
        if(docInput.value != '') {
            equation[eCount++] = docInput.value;
            docEquation.value += docInput.value;
            equation[eCount++] = '*';
            docEquation.value += '*';
        }
        equation[eCount++] = parenthesis;
        docEquation.value += parenthesis;
        docInput.value = '';
    }
    else {
        if(pCount > 0 && (last != '(' || docInput.value != '')) {
            pCount--;
            if(docInput.value != '') {
                equation[eCount++] = docInput.value;
                docEquation.value += docInput.value;
            }
            equation[eCount++] = parenthesis;
            docEquation.value += parenthesis;
            docInput.value = '';            
        }
    }
}

function clearInput() {
    docInput.value = '';
    docEquation.value = '';
}

function backspace() {
    docInput.value = docInput.value.substring(0, docInput.value.length - 1);
}

function addHistory() {
    if(historyCount > 5) {
        for(i = 1; i > 5; i++) {
            historyEquation[i] = historyEquation[i - 1];
            historyResult[i] = historyResult[i - 1];
        }
        historyCount = 4;
    }
    historyEquation[historyCount] = docEquation.value;
    historyResult[historyCount++] = docInput.value;
}

function evaluateEquation() {
    if(docInput.value != '') {
        equation[eCount++] = docInput.value;
        docEquation.value += docInput.value;
        docInput.value = '';
    }
    docInput.value = eval(docEquation.value);
    addHistory();
    docEquation.value += '=';
    remainder = true;
    period = false;
    eCount = 0;
    equation = [];
}