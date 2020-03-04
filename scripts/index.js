

//This segment deals with the first row of buttons on the calculator for clicking
document.getElementById("left-parenthesis").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("right-parenthesis").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("modulo").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("clear").addEventListener('click', function(event) {
    document.getElementById("input").value='';
});

//This segment deals with the second row of buttons on the calculator for clicking
document.getElementById("seven").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("eight").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("nine").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("divide").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});

//This segment deals with the third row of buttons on the calculator for clicking
document.getElementById("four").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("five").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("six").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("multiply").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});

//This segment deals with the fourth row of buttons on the calculator for clicking
document.getElementById("one").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("two").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("three").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("subtract").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});

//This segment deals with the fifth row of buttons on the calculator for clicking
document.getElementById("zero").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("period").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});
document.getElementById("equals").addEventListener('click', function(event) {
    Compute(document.getElementById("input").value);
});
document.getElementById("add").addEventListener('click', function(event) {
    document.getElementById("input").value+=this.value;
});

//Function for computing the actual output
function Compute(input) {
    document.getElementById('input').value=eval(document.getElementById('input').value);
}