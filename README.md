# JavaScript Calculator v0.3

Used as practice for manipulating HTML documents with JavaScript, its a simple calculator with interactable buttons a working calculating interface.
It supports addition, subtraction, division, and multiplication. As well as parenthesis operations.
Both integer and floating point operations work.

Work in progress. 

To-Do List:

- Add a side button to extend the calculator to be a scientific calculator with more operands like exponents, logorithms, trig functions, etc.
- Add input checking for above operators and functions
- Add evaluation & infix > postfix conversion for above operators and functions
- Add and finish History button functionality for the last 5 equations and answers

Updates:

v0.3 :
- Fixed leading operator illogical inputs
- Fixed parenthesis illogical input bugs
- Added input error message when an illogical equation tries to be evaluated

v0.2 :
- Made textfields readonly
- Improved upon input checking for illogical input:
  - When entering a left parenthesis after an operand, or an operand after a right parenthesis, the parser defaults to a multiplication operation between them
  - Using string.includes() to look for the existance of a period instead of a boolean flag
  - When cliking an operator without inputing an operand, if the last input was an operator, it will be replaced with the new operator
- I opted out of making my own parser. Instead I:
  - Keep track of the equation using an array, an index is an operand, operator, or a parenthesis
  - Convert the array from infix to postfix
  - Compute the postfix operation using a stack, and each sub-operation is computed safely with eval()
- Removed eCount counter for equation array in place of push() pop() and shift() array methods
- Added console.log() throughout for output checking

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