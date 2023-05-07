import getLetterList from "./getLetterList.mjs";

export default function getMostCommonLetter(sum) {
  const letters = getLetterList(sum);

  return Object.keys(letters).reduce(
    (acc, letter) => {
      if (letters[letter] > acc.count) {
        acc.count = letters[letter];
        acc.letters = [letter];
      } else if (letters[letter] === acc.count) {
        acc.letters.push(letter);
      }
      return acc;
    },
    { count: 0, letters: [] }
  );
}
