let parenthesis = false;
let parenthesisCount = 0;

//This segment deals with the first row of buttons on the calculator for clicking
document.querySelector("#left-parenthesis").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
    parenthesis = true;
});
document.querySelector("#right-parenthesis").addEventListener('click', function(event) {
    if (parenthsis === true) {
        document.querySelector("#input").value+=this.value;
        if (--count === 0) {
            parenthesis = false;
        }
    }
});
document.querySelector("#clear").addEventListener('click', function(event) {
    document.querySelector("#input").value='';
});
document.querySelector("#backspace").addEventListener('click', function(event) {
    document.querySelector("#input").value=document.querySelector("#input").value.substring(0, document.querySelector("#input").value - 1);
});

//This segment deals with the second row of buttons on the calculator for clicking
document.querySelector("#seven").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#eight").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#nine").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#divide").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});

//This segment deals with the third row of buttons on the calculator for clicking
document.querySelector("#four").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#five").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#six").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#multiply").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});

//This segment deals with the fourth row of buttons on the calculator for clicking
document.querySelector("#one").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#two").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#three").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#subtract").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});

//This segment deals with the fifth row of buttons on the calculator for clicking
document.querySelector("#zero").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#period").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});
document.querySelector("#equals").addEventListener('click', function(event) {
    Compute(document.querySelector("#input").value);
});
document.querySelector("#add").addEventListener('click', function(event) {
    document.querySelector("#input").value+=this.value;
});

//Function for computing the actual output
function Compute(input) {
    document.querySelector('input').value=eval(document.querySelector('input').value);
}