import getMostCommonLetter from "./getMostCommonLetter.mjs";
import getDominantCategory from "./getDominantCategory.mjs";
import letterOccurence from "./letterOccurence.mjs";

class Application {
  constructor() {
    this.button = document.getElementById("getJokes");
    this.button.addEventListener("click", () => {
      this.getJokes();
    });

    this.jokes = [];
  }

  getJokes() {
    const amount = document.getElementById("amount").value ?? undefined;
    const type = document.getElementById("type").value ?? undefined;

    fetch(`/api/jokes?amount=${amount}&type=${type}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          this.jokes = data;

          this.printJokes();
          this.printStatistics();
        }
      });
  }

  printJokes() {
    const jokesDiv = document.getElementById("jokes");
    jokesDiv.innerHTML = "";

    this.jokes.forEach((joke) => {
      jokesDiv.appendChild(this.getJokeMarkupEl(joke));
    });
  }

  getJokeMarkupEl(joke) {
    const jokeDiv = document.createElement("div");

    if (joke.type === "twopart") {
      jokeDiv.innerHTML = `
        <h3>${joke.type} - ${joke.category}</h3>
        <p>${joke.setup}</p>
        <p>${joke.delivery}</p>
      `;
    } else {
      jokeDiv.innerHTML = `
        <h3>${joke.type} - ${joke.category}</h3>
        <p>${joke.joke}</p>
      `;
    }

    jokeDiv.innerHTML = jokeDiv.innerHTML.replaceAll(
      /(\w*a\w*)/gi,
      '<span style="color: blue;">$1</span>'
    );
    return jokeDiv;
  }

  getDominantCategoryMarkup(dominantData) {
    let markup = "";
    dominantData.forEach((data) => {
      markup += `${data.category} (${data.percentage.toFixed(0)}%), `;
    });
    return markup;
  }
  printStatistics() {
    const jokes = this.jokes;

    const singleJokes = jokes.filter((joke) => joke.type === "single");
    const twoPartJokes = jokes.filter((joke) => joke.type === "twopart");

    //Single part jokes ========
    let singleSum = "";
    const totalCharsSingleJokes = singleJokes.reduce((acc, joke) => {
      singleSum += joke.joke;
      return acc + joke.joke.length;
    }, 0);

    if (singleJokes.length > 0) {
      const singleThirdLetter = singleJokes
        .reverse()[0]
        .joke.split(" ")
        .reverse(0)[0]
        .split("")[2]
        .toLocaleLowerCase();

      const singleThirdLetterOccurences = letterOccurence(
        singleSum,
        singleThirdLetter
      );
      const singleMostCommonLetter = getMostCommonLetter(singleSum);

      const singleDominantData = getDominantCategory(singleJokes);

      document.getElementById("statistics").innerHTML = `
        <h2>Statistics single:</h2>
        <p>Total chars: ${totalCharsSingleJokes}</p>
        <p>Third letter of the last joke occurence (${singleThirdLetter}): ${singleThirdLetterOccurences}</p>
        <p>Most commong letter: ${singleMostCommonLetter.letters[0]}</p>
        <p>Dominant categorie(s): ${this.getDominantCategoryMarkup(
          singleDominantData
        )}</p>
      `;
    } else {
      document.getElementById("statistics").innerHTML = "";
    }

    //Two part jokes ========

    //All chars of the two part jokes
    if (twoPartJokes.length > 0) {
      let twoPartSum = "";
      const totalCharsTwoPartJokes = twoPartJokes.reduce((acc, joke) => {
        twoPartSum += joke.setup + joke.delivery;
        return acc + joke.setup.length + joke.delivery.length;
      }, 0);

      //third letter of last joke occurenct amount
      let doubbleThirdLetter = "";

      const split = twoPartJokes
        .reverse()[0]
        .delivery.split(" ")
        .reverse(0)[0]
        .split("");

      //Sometimes the last jokes last word dosent have a 3rd letter, take the last letter instead
      if (split[2]) {
        doubbleThirdLetter = split[2].toLocaleLowerCase();
      } else {
        doubbleThirdLetter = twoPartSum.split("").reverse()[0];
      }
      const doubbleThirdLetterOccurences = letterOccurence(
        twoPartSum,
        doubbleThirdLetter
      );
      const doubbleMostCommonLetter = getMostCommonLetter(twoPartSum);

      const doubbleDominantData = getDominantCategory(twoPartJokes);

      document.getElementById("statistics_doubble").innerHTML = `
      <h2>Statistics doubble:</h2>
      <p>Total chars: ${totalCharsTwoPartJokes}</p>
      <p>Third letter of the last joke occurence (${doubbleThirdLetter}): ${doubbleThirdLetterOccurences}</p>
      <p>Most commong letter: ${doubbleMostCommonLetter.letters[0]}</p>
      <p>Dominant categorie(s): ${this.getDominantCategoryMarkup(
        doubbleDominantData
      )}</p>
    `;
    } else {
      document.getElementById("statistics_doubble").innerHTML = "";
    }
  }
}

const App = new Application();
