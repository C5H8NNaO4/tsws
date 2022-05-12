const randomNumbers = [];
let nextNumber;

function randomNumber() {
  return Math.floor(Math.random() * (100 - 1)) + 1;
}

for (let i = 0; i < 10; i++) {
  nextNumber = randomNumber();
  randomNumbers.push(nextNumber);
}

console.log(randomNumbers);
