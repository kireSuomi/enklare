export default function getDominantCategory(jokes) {
  const categories = {};

  jokes.forEach((joke) => {
    if (categories[joke.category]) {
      categories[joke.category]++;
    } else {
      categories[joke.category] = 1;
    }
  });

  //Find the highest value
  let dominantCategory = { count: 0, category: "" };

  Object.keys(categories).forEach((category) => {
    if (categories[category] > dominantCategory.count) {
      dominantCategory.count = categories[category];
      dominantCategory.category = category;
    }
  });

  return {
    category: dominantCategory.category,
    percentage: (dominantCategory.count / jokes.length) * 100,
  };
}
