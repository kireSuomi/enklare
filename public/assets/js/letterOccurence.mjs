export default function letterOccurence(sum, thirdLetter) {
  thirdLetter = thirdLetter.toLocaleLowerCase();
  sum = sum.toLocaleLowerCase();

  return sum.split("").reduce((acc, letter) => {
    if (letter === thirdLetter) {
      acc++;
    }
    return acc;
  }, 0);
}
