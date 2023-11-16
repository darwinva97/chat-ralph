export function generateNumberString(n: number = 5) {
  let numberString = "";
  for (let i = 0; i < n; i++) {
    numberString += Math.floor(Math.random() * 10);
  }
  return numberString;
}