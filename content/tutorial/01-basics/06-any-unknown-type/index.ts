const randomValue: any = 10;

// Logs "undefined" to the console
console.log(randomValue.name);

// Returns "randomValue is not a function" error
randomValue();

// Returns "randomValue is not a function" error
randomValue.toUpperCase();
