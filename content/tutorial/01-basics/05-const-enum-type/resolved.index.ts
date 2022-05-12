const enum Kind {
  Sweet,
  GoodForKids,
  InstanKillAndTooManyLegs,
}

// --- 1

enum Habitats {
  Forest = 'Forest',
  PolarRegionsAndMountains = 'Polar Regions and Mointains',
  Ocean = 'Ocean',
  Internet = 'Internet',
}

// --- 2

const animal = {
  name: 'Cat',
  habitat: Habitats.PolarRegionsAndMountains,
  kind: Kind.GoodForKids,
};

console.log(animal);
