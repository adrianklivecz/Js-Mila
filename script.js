function generateMealsByIndex() {
  const mealsIndex = document.createElement("div");
  mealsIndex.classList.add("meals-index");
  document.body.appendChild(mealsIndex);

  generateAlphabetLetters(mealsIndex);
}

function generateAlphabetLetters(mealsIndex) {
  for (let i = 65; i < 91; i++) {
    const letter = String.fromCharCode(i);
    console.log(letter);
    const letterDOM = document.createElement("p");
    letterDOM.innerText = letter;
    mealsIndex.appendChild(letterDOM);
    letterDOM.addEventListener("click", generateMealPage);
  }
}

function generateMealPage(event) {
  getMealsFromServer(event.target.innerText);
}

function getMealsFromServer(letter) {
  const url = generateUrl(letter);
  fetch(url)
    .then(r => r.json())
    .then(json => {
      generateMeal(json, letter);
    });
  console.log(url);
}

function generateUrl(letter) {
  return `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
}

function generateMeal(json, letter) {
  console.log(json);

  const meals = json.meals;
  let mealIndex = 0;

  const container = document.createElement("div");
  container.classList.add("meal-page");
  document.body.appendChild(container);

  renderMealsElements(meals[mealIndex], letter, container);
  addMealsNavigation(meals, letter, container);
}

function renderMealsElements(mealData, letter, container) {
  container.innerHTML = null;

  const title = document.createElement("h1");
  title.innerText = `Discover our recipes (${letter})`;
  container.appendChild(title);

  const mealName = document.createElement("h2");
  mealName.innerText = mealData.strMeal;
  container.appendChild(mealName);

  const mealImg = document.createElement("img");
  mealImg.setAttribute("src", mealData.strMealThumb);
  mealImg.classList.add("meal-img");
  container.appendChild(mealImg);

  const mealDesc = document.createElement("p");
  mealDesc.innerText = mealData.strInstructions;
  container.appendChild(mealDesc);
}

function addMealsNavigation(meals, letter, container) {
  const navigation = document.createElement("div");
  navigation.classList.add("meal-navigation");

  const leftButton = document.createElement("div");
  leftButton.innerText = "<";
  leftButton.style.opacity = 0.5;

  const rightButton = document.createElement("div");
  rightButton.innerText = ">";

  navigation.appendChild(leftButton);
  navigation.appendChild(rightButton);

  document.body.appendChild(navigation);

  setNavigationFunctionality(meals, leftButton, rightButton, letter, container);
}

function setNavigationFunctionality(
  meals,
  leftButton,
  rightButton,
  letter,
  container
) {
  let currentIndexMeal = 0;

  leftButton.addEventListener("click", () => {
    if (currentIndexMeal > 0) {
      currentIndexMeal--;
      renderMealsElements(meals[currentIndexMeal], letter, container);
      rightButton.style.opacity = 1;
    }

    if (currentIndexMeal === 0) leftButton.style.opacity = 0.5;
  });

  rightButton.addEventListener("click", () => {
    if (currentIndexMeal + 1 < meals.length) {
      currentIndexMeal++;
      renderMealsElements(meals[currentIndexMeal], letter, container);
      leftButton.style.opacity = 1;
    }

    if (currentIndexMeal === meals.length - 1) rightButton.style.opacity = 0.5;
  });
}

generateMealsByIndex();
