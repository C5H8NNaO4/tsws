let firstName: string;
let lastName: string;
let fullName: string;
let age: string | number;
let germanCitizen: boolean;

firstName = 'Rebecca';
lastName = 'Smith';
age = 42;
germanCitizen = false;
fullName = firstName + ' ' + lastName;

if (germanCitizen) {
  console.log(
    'My name is ' + fullName + ", I'm " + age + ", and I'm a citizen of the United Kingdom.",
  );
} else {
  console.log(
    'My name is ' + fullName + ", I'm " + age + ", and I'm not a citizen of the United Kingdom.",
  );
}
