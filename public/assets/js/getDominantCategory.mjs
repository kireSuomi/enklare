export default function getDominantCategory(jokes) {
  const categories = {};
  jokes.forEach((joke) => {
    if (categories[joke.category]) {
      categories[joke.category]++;
    } else {
      categories[joke.category] = 1;
    }
  });

  // Calculate total number of jokes
  const totalJokes = jokes.length;

  // Find the highest value
  let dominantCategories = [];

  Object.keys(categories).forEach((category) => {
    const count = categories[category];
    const percentage = (count / totalJokes) * 100;

    if (dominantCategories.length === 0) {
      dominantCategories.push({ category, count, percentage });
    } else {
      const highestPercentage = dominantCategories[0].percentage;

      if (percentage === highestPercentage) {
        dominantCategories.push({ category, count, percentage });
      } else if (percentage > highestPercentage) {
        dominantCategories = [{ category, count, percentage }];
      }
    }
  });

  return dominantCategories;
}
