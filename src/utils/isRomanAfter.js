export function isRomanAfter(roman1, roman2) {
    const romanToInt = {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 5,
      VI: 6,
      VII: 7,
      VIII: 8,
      IX: 9,
      X: 10,
      XI: 11,
      XII: 12
    };
  
    return romanToInt[roman1] <= romanToInt[roman2]; // Compare if roman1 is after roman2
  }