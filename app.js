"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchRecipes() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const data = yield response.json();
        console.log(data);
        return data.meals;
    });
}
function createRecipeCard(recipe) {
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
function openModal(recipe) {
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
        const closeBtn = document.getElementsByClassName('close')[0];
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}
function displayRecipes() {
    return __awaiter(this, void 0, void 0, function* () {
        const recipesContainer = document.getElementById("recipes");
        if (recipesContainer) {
            try {
                const recipes = yield fetchRecipes();
                recipes.forEach((recipe) => {
                    const card = createRecipeCard(recipe);
                    recipesContainer.appendChild(card);
                });
            }
            catch (error) {
                console.log("une erreur est survenue");
            }
        }
    });
}
displayRecipes();
