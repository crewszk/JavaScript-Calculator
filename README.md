# JavaScript Calculator v0.1

Used as practice for manipulating HTML documents with JavaScript, its a simple calculator with interactable buttons a working calculating interface.
It supports addition, subtraction, division, and multiplication. As well as parenthesis operations.
Both integer and floating point operations work.

Work in progress. 

To-Do List:

- Add a side button to extend the calculator to be a scientific calculator with more operands like exponents, logorithms, trig functions, etc.
- Add for replacing the previous operator if mistakely clicked such as clicking * will replace the + in the equation 82-4+
- Develop my own parser instead of using eval() function to support additional operands

Updates:

v0.1 :
- Removed bulky JS file for styling buttons on hover in favor of CSS styling with hover attribute
- Added full checking functionality for illogical input such as:
  - multiple periods in a given operand
  - right perenthesis with no corresponding left parenthesis
  - right parenthesis after operators like (82*)
  - doubling up on operators such as // or **
- Reduced bulky franken code in the operations.js file in favor of more comprehensible code
- added history functionality for later use (NOT FULLY IMPLEMENTED OR CHECKED FOR CORRECTNESS)
- added equation stack for later development of a custom parser instead of using eval() (NOT FULLY IMPLEMENTED OR CHECKED FOR CORRECTNESS)