export default function getLetterList(sum) {
  //Most common letter
  const letters = {};
  sum.split("").forEach((letter) => {
    letter = letter.toLocaleLowerCase();

    if (letter == " ") {
      return;
    }
    if (letters[letter]) {
      letters[letter]++;
    } else {
      letters[letter] = 1;
    }
  });

  return letters;
}
