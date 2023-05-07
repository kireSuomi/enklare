import getMostCommonLetter from "./getMostCommonLetter.mjs";
import getDominantCategory from "./getDominantCategory.mjs";
import letterOccurence from "./letterOccurence.mjs";

const btnGetJokes = document.getElementById("getJokes");

btnGetJokes.addEventListener("click", getJokes);

function getJokeMarkupEl(joke) {
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

function printJokes(jokes) {
  const jokesDiv = document.getElementById("jokes");
  jokesDiv.innerHTML = "";

  jokes.forEach((joke) => {
    jokesDiv.appendChild(getJokeMarkupEl(joke));
  });
}

function printStatistics(jokes) {
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
      <p>Dominant category: ${
        singleDominantData.category
      } (${singleDominantData.percentage.toFixed(0)}%)</p>
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
    const doubbleThirdLetter = twoPartJokes
      .reverse()[0]
      .delivery.split(" ")
      .reverse(0)[0]
      .split("")[2]
      .toLocaleLowerCase();
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
      <p>Dominant category: ${
        doubbleDominantData.category
      } (${doubbleDominantData.percentage.toFixed(0)}%)</p>
    `;
  } else {
    document.getElementById("statistics_doubble").innerHTML = "";
  }
}

function getJokes() {
  const amount = document.getElementById("amount").value ?? undefined;
  const type = document.getElementById("type").value ?? undefined;

  console.log(amount, type);
  fetch(`/api/jokes?amount=${amount}&type=${type}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        //Print the jokes and statistics
        printJokes(data);
        printStatistics(data);
      }
    });
}