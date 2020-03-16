//For shorter syntax when referencing the input and equation text fields
let docInput = document.querySelector("#input");
let docEquation = document.querySelector("#equation");

//Lists of all the buttons
let numList = document.querySelectorAll(".number");
let operatorList = document.querySelectorAll(".operations");
let parenthesisList = document.querySelectorAll(".parenthesis");

/*Default values: 
    Remainder: flags if an answer exists from a previous equation in the text field
    pCount: Counts how many left parenthesis exist for right parenthesis input checking
    equation[]: the current equation stack
    historyEquation[]: the past equations successfully evaluated
    historyResult[]: the past results of successful evaluation of equations, 1 to 1 with historyEquation indicies
*/
let remainder = false;
let pCount = 0;
let equation = [];
let historyEquation = [];
let historyResult = [];

//Initialize click event listeners for buttons
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

//Add a number/period upon clicking a number/period button
function addNumber(num) {
    //If an answer exists from the previous equation, clear the input and equation text fields
    if(remainder == true) {
        docEquation.value = '';
        docInput.value = '';
        remainder = false;
    }    

    //If the input is a period and the operand is already a floating point number, ignore the input
    if(num == '.' && docInput.value.includes('.')) {
        return;
    }

    //Add the input to the text field
    docInput.value += num;
}

//Add an operator upon clicking an operator button
function addOperator(operator) {

    //If an answer exists in the input text field, clear the equation field
    if(isNaN(docInput.value) == true) {
        docEquation.value = '';
        docInput.value = '';
        remainder = false;
        return;
    }
    
    if (remainder == true){
        docEquation.value = '';
        remainder = false;
    }

    let last = equation[equation.length - 1];

    //If there is no operand entered, the last value is not a number or right parenthesis
    if(docInput.value == '') {
        //If the last value is not a left parenthesis, replace the last operator with the current one
        if(docEquation.value == '') {
            return;
        }        
        else if(last != '(' && isNaN(last) == true && last != ')') {
            equation.pop();
            docEquation.value = docEquation.value.substring(0, docEquation.value.length - 1);
        }
        //Ignore input, operators after left parenthesis are illogical
        else {
            return;
        }
    }
    //Else if there is an operand entered
    else if(docInput.value != '') {
        //And the last value is a right parenthesis, append a multiplcation value first, then the push operand available
        //onto the equation stack
        if(last == ')') {
            equation.push('*');
        }

        //remove leading zeros
        if(docInput.value[0] == '0') {
            zeroRemover();
        }

        equation.push(docInput.value);
        docEquation.value += docInput.value;
    }

    //Push the operator onto the equation
    equation.push(operator);
    docEquation.value += operator;
    docInput.value = '';
}

//Add a parenthesis upon clicking a prenthesis button
function addParenthesis(parenthesis) {

    //If an answer exists in the input text field, default the input and equation text fields
    if(remainder == true) {
        remainder = false;
        docEquation.value = '';
        docInput.value = '';
    }

    let last = equation[equation.length - 1];
    //If its a left parenthesis
    if(parenthesis == '(') {
        pCount++;
        //Check if there is an operand in the input text field, if so push to the stack and append a
        //multiplication value as a default operator
        if(docInput.value != '') {
            equation.push(docInput.value);
            docEquation.value += docInput.value;
            equation.push('*');
        }
        //If the previous value in the equation array is a right parenthesis, append a multiplication value
        //as a default operator between the two parenthesis
        else if(last == ')') {
            equation.push('*');
        }        
    }
    //If its a right parenthesis
    else {
        //Check if a coresponding left parenthesis exists and the last operator isnt a left parenthesis itself
        if(pCount > 0 && last != '(') {
            pCount--;
            //If there is an operand in the input field, apprend it to the equation first
            if(docInput.value != '') {
                equation.push(docInput.value);
                docEquation.value += docInput.value;
            }                 
        }
        //If there are no cooresponding left parenthesis, ignore input
        else {
            return;
        }
    }

    //Add parenthesis to equation
    equation.push(parenthesis);
    docEquation.value += parenthesis;
    docInput.value = ''; 
}

//set text fields and equation to default values
function clearInput() {
    docInput.value = '';
    docEquation.value = '';
    remainder = false;
    equation = [];
    console.clear();
}

//remove the last value in the input text field
function backspace() {
    //Do not allow backspacing through an answer to an equation
    if(remainder == true) {
        return;
    }
    docInput.value = docInput.value.substring(0, docInput.value.length - 1);
}

function zeroRemover() {
    let zero = docInput.value.split("");
    while(zero[0] == '0') {
        zero.shift();
    }
    docInput.value = zero.join("");
}

//Push the equation and answer to the history stacks
function addToHistory() {
    if(historyEquation.length > 5) {
        historyEquation.shift();
        historyResult.shift();
    }
    historyEquation.push(docEquation.value);
    historyResult.push(docInput.value);
}

//Evaluates the equation upon clicking the equals button
function evaluateEquation() {

    //Ignore equals input if no equation present
    if(equation.length == 0) {
        return;
    }
    //Check if last index is an operator, if true send error input
    if(isOperator(equation[equation.length - 1]) == true && docInput.value == '') {
        console.log(`${equation.join('')} is not a valid equation`);
        equation = [];
    }
    else {
        //Check for input in the textfield, if true append to equation
        if(docInput.value != '') {

            //Remove leading zeros
            if(docInput.value[0] == '0') {
                zeroRemover();
            }
            equation.push(docInput.value);
            docEquation.value += docInput.value;
            docInput.value = '';
        }
        //If there exist left parenthesis without a partnering right parenthesis, append right parenthesis till pCount is 0
        for(; pCount > 0; pCount--) {
            equation.push(')');
            docEquation.value += ')';
        }

        //log equation infix notation, convert to postfix, log equation postfix notation
        console.log(`Equation Infix: ${equation}`)
        equation = infixPostfixConversion();
        console.log(`Equation Postfix: ${equation}`);
    }

    docEquation.value += '=';

    //Check if equation length is 0 after postfix conversion
    if(equation.length == 0) {
        docInput.value = "Invalid";
        remainder = false;
    }
    else {
        let temp = [];

        //Evaluation of equation if in proper syntax till equations queue is empty
        while(equation.length != 0) {
            let current = equation[0];

            //If the current value is a number, push to stack
            if(isNaN(current) == false) {
                temp.push(equation.shift())
            }
            //if the current value is an operator, pop 2 values from the stack, complete the operation on those values,
            //log the evaluation, push the output to the stack, and shift upwards in the equation queue
            else if(isOperator(current) == true) {
                let a = temp.pop();
                let b = temp.pop();

                //If an invalid input causes undefined values to emerge, exit ecaluation and return an error
                if(a == undefined || b == undefined) {
                    console.log(`Equation has input errors - Exiting Evaluation`);
                    equation = [];
                    remainder = true;
                    docInput.value = "Invalid";
                    return;
                }

                temp.push(eval(`${b}${current}${a}`));
                console.log(`${b} ${current} ${a} = ${temp[temp.length - 1]}`)
                equation.shift();
            }
            //An unknown input was found, force exit the loop
            else {
                console.log(`A weird value was found: ${current} - Exiting Evaluation`);
                break;
            }
        }

        console.log(`Final Answer: ${temp[0]}`)
        docInput.value = temp.pop();
        addToHistory();
    }        

    //reset default values
    equation = [];
    remainder = true;
}

//Converting the equation array from infix notation to postfix
function infixPostfixConversion() {
    let postfixStack = ['('];
    let ePostfix = [];
    equation.push(')');

    while(equation.length != 0) {
        let current = equation[0];

        //If current is a left parenthesis, push it to the stack
        if(current == '(') {
            postfixStack.push(equation.shift());
        }
        //If current is a number, add it to the postfix notation array
        else if(isNaN(current) == false) {
            ePostfix.push(equation.shift());
        }
        //If current is an operator, pop operators off the stack that have a higher or lower precedence than the current operator onto
        //the postfix notation array, and then push the operator to the stack
        else if(isOperator(current) == true) {
            while(precedence(current) <= precedence(postfixStack[postfixStack.length - 1])) {
                ePostfix.push(postfixStack.pop());
            }
            postfixStack.push(equation.shift());
        }
        //If current is a right parenthesis, pop operators off the stack till a left parenthesis is found, then remove the left parenthesis
        else if(current == ')') {
            while(postfixStack[postfixStack.length - 1] != '(') {
                ePostfix.push(postfixStack.pop());
            }
            postfixStack.pop();
            equation.shift();
        }
        //Unknown value found, log the value and return empty array for invalid input error checking in evaluateEquation() function
        else {
            ePostfix = [];
            break;
        }
    }
    return ePostfix;
}

//return true if the provided value is an operator
function isOperator(symbol) {
    return (symbol == '*' || symbol == '/' || symbol == '-' || symbol == '+');
}

//return the precedence level of a given symbol
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

//toggle the history HTML box when the history button is clicked
function toggleHistory() {
    
}