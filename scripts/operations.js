let remainder = false;
let period = false;
let parenthesisCount = 0;

/*This segment deals with the first row of buttons on the calculator for clicking

This is the left-parenthesis button and it will keep track if there are left-parenthesis or not as it would be illogical
to have a right parenthesis without a cooresponding left one.*/
document.querySelector("#left-parenthesis").addEventListener('click', function(event) {
    remainder = false;
    document.querySelector("#input").value += this.value;
    parenthesisCount++;
});

//This is the right parenthesis button and it will ensure only to place a right parenthesis if there
//is a cooresponding left one.
document.querySelector("#right-parenthesis").addEventListener('click', function(event) {
    remainder = false;    
    if (parenthesisCount > 0) {
        parenthesisCount--;
        document.querySelector("#input").value += this.value;
    }
});

//This is the all clear button and it will completely clear the #input text field
document.querySelector("#clear").addEventListener('click', function(event) {
    remainder = false;
    document.querySelector("#input").value = '';
});

//This is the backspace button and it will make the #input text field equal a substring of the current value of the text field without
//the last character
document.querySelector("#backspace").addEventListener('click', function(event) {
    remainder = false;   
    document.querySelector("#input").value = document.querySelector("#input").value.substring(0, document.querySelector("#input").value.length - 1);
});

//This segment deals with the second row of buttons on the calculator for clicking
document.querySelector("#seven").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#eight").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#nine").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#divide").addEventListener('click', function(event) {
    addOperator(this.value);
});

//This segment deals with the third row of buttons on the calculator for clicking
document.querySelector("#four").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#five").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#six").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#multiply").addEventListener('click', function(event) {
    addOperator(this.value);
});

//This segment deals with the fourth row of buttons on the calculator for clicking
document.querySelector("#one").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#two").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#three").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#subtract").addEventListener('click', function(event) {
    addOperator(this.value);
});

//This segment deals with the fifth row of buttons on the calculator for clicking
document.querySelector("#zero").addEventListener('click', function(event) {
    addNumber(this.value);
});
document.querySelector("#period").addEventListener('click', function(event) {
    addNumber(this.value);
});

//This is the equals button and it will activate the compute() method where it
document.querySelector("#equals").addEventListener('click', function(event) {
    compute();
    remainder = true;
    period = false;
});
document.querySelector("#add").addEventListener('click', function(event) {
    addOperator(this.value);
});

//Function for computing the actual output
function compute() {
    document.querySelector('input').value=eval(document.querySelector('input').value);
}

//Encapsulation of applying a number to the text field
function addNumber(number) {
    if (remainder === true) { 
        document.querySelector("#input").value = '';
        remainder = false;
    }
    if (number === '.'){
        if (period === false) {
            document.querySelector("#input").value += '0';
            period = true;
        }
        else {
            return;
        }
    }
    document.querySelector("#input").value += number;
}

//Encapsulation of applying an operator to the text field
function addOperator(operator) {
    remainder = false;
    period = false;
    document.querySelector("#input").value += operator;
}