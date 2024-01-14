interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  [key: string]: string;
}

async function fetchRecipes() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );

  const data = await response.json();
  console.log(data);
  return data.meals;
}

function createRecipeCard(recipe: Recipe) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  const image = document.createElement("img");
  image.src = recipe.strMealThumb;
  card.appendChild(image);

  const name = document.createElement("h3");
  name.textContent = recipe.strMeal;
  card.appendChild(name);

  const category = document.createElement("p");
  category.textContent = `Category: ${recipe.strCategory}`;
  card.appendChild(category);

  const area = document.createElement("p");
  area.textContent = `Area: ${recipe.strArea}`;
  card.appendChild(area);

  card.addEventListener("click", () => {
    openModal(recipe);
  });
  return card;
}

function openModal(recipe: Recipe) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalIngredients = document.getElementById("modal-ingredients");
  

  if (modal && modalTitle && modalIngredients) {
    modalTitle.textContent = recipe.strMeal;
    modalIngredients.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      if (recipe[ingredientKey]) {
        const ingredientItem = document.createElement("li");

        ingredientItem.textContent = `${recipe[ingredientKey]} - ${recipe[measureKey]}`;
    
        modalIngredients.appendChild(ingredientItem);
      }
    }

    modal.style.display = "block";

    const closeBtn = document.getElementsByClassName('close')[0]

    closeBtn.addEventListener('click',()=>{
        modal.style.display = "none"
    })

    window.addEventListener('click',(event)=>{
        if(event.target === modal){
            modal.style.display = 'none'
        }
    })
  }
}

async function displayRecipes() {
  const recipesContainer = document.getElementById("recipes");

  if (recipesContainer) {
    try {
      const recipes = await fetchRecipes();

      recipes.forEach((recipe: Recipe) => {
        const card = createRecipeCard(recipe);
        recipesContainer.appendChild(card);
      });
    } catch (error) {
      console.log("une erreur est survenue");
    }
  }
}

displayRecipes();
