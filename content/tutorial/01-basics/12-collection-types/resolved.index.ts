const enum PersonProps {
  firstName,
  lastName,
  wanted,
}

type Person = [string, string, boolean];

const peter: Person = ['Peter', 'Mueller', true];
const adel: Person = ['Adelheit', 'Roemer', false];

const GuestList: Person[] = [peter, adel, ['Luise', 'Kuschinski', false]];

const lastNames = GuestList.map((person) => person[PersonProps.lastName]);
console.log(lastNames);
