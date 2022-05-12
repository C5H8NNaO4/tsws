type testResult = 'pass' | 'fail' | 'incomplete';
let myResult: testResult;
myResult = 'incomplete';
myResult = 'pass';
myResult = 'fail';

type dice = 1 | 2 | 3 | 4 | 5 | 6;
let diceRoll: dice;
diceRoll = 1;
diceRoll = 2;
diceRoll = 5;

// Bonus: why is this invalid? Fix it too
diceRoll = (7 - 1) as dice;
// 7-1 returns number. dice is not number, ist a specific subset of numbers

type myBoolean = true | false;
let myBool: myBoolean;
myBool = true;
myBool = false;
