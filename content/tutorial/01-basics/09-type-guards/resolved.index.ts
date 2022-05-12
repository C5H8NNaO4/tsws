let randomValue: unknown = 10;

randomValue = true;
randomValue = 'Mateo';

if (typeof randomValue === 'string') {
  console.log((randomValue as string).toUpperCase());
} else {
  //* Returns an error message.
  console.log('Error - A string was expected here.');
}
