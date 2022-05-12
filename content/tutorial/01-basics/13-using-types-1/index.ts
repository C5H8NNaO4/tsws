let firstName;
let lastName;
let fullName;
let age;
let germanCitizen;

firstName = 'Rebecca';
lastName = 'Smith';
age = 42;
germanCitizen = false;
fullName = firstName + ' ' + lastName;

if (germanCitizen) {
  console.log('My name is ' + fullName + ", I'm " + age + ", and I'm a citizen of Germany.");
} else {
  console.log('My name is ' + fullName + ", I'm " + age + ", and I'm not a citizen of Germany.");
}
