function whichMonths(season) {
  let monthsInSeason: string;
  switch (season) {
    case 'Fall':
      monthsInSeason = 'September to November';
      break;
    case 'Winter':
      monthsInSeason = 'December to February';
      break;
    case 'Spring':
      monthsInSeason = 'March to May';
      break;
    case 'Summer':
      monthsInSeason = 'June to August';
  }
  return monthsInSeason;
}

console.log(whichMonths('Fall'));
