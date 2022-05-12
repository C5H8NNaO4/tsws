type testResult = 'pass' | 'fail' | 'incomplete';
let myResult: testResult;
myResult = 'incomplete'; //* Valid
myResult = 'pass'; //* Valid
myResult = 'failure'; //* Invalid

type dice = 1 | 2 | 3 | 4 | 5 | 6;
let diceRoll: dice;
diceRoll = 1; //* Valid
diceRoll = 2; //* Valid
diceRoll = 7; //* Invalid

// Bonus: why is this invalid? Fix it too
diceRoll = 7 - 1;

type myBoolean = true | false;
let myBool: myBoolean;
myBool = true;
myBool = false;
