declare global {
  interface Array<T> {
    shuffle(): T[];
  }

  interface ArrayConstructor {
    guard<T>(x: T | T[]): T[];
  }
}

Array.prototype.shuffle = function shuffle() {
  const array = this;
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

Array.guard = <T>(x: T | T[]): T[] => (Array.isArray(x) ? x : Array.from(x ? [x] : []));

export const arr = {
  shuffle: Array.prototype.shuffle,
  guard: Array.guard,
};
