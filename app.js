const PROGRAM = {
  startDate: "2026-07-11",
  totalDays: 90,
  startWeight: 178,
  goalWeight: 155,
  weeklyTargets: [
    { calories: 2100, protein: 175 },
    { calories: 2100, protein: 170 },
    { calories: 2000, protein: 180 },
    { calories: 2000, protein: 180 },
    { calories: 1900, protein: 175 },
    { calories: 1900, protein: 175 },
    { calories: 1800, protein: 160 },
    { calories: 1800, protein: 165 },
    { calories: 1700, protein: 150 },
    { calories: 1700, protein: 150 },
    { calories: 1650, protein: 150 },
    { calories: 1650, protein: 145 },
    { calories: 1600, protein: 140 }
  ]
};

const groceries = {
  Protein: [
    "Chicken breast – 3 lb",
    "Salmon – 1.5 lb",
    "Cod – 1.5 lb",
    "Lean turkey – 1 lb",
    "Eggs – 18",
    "Greek yogurt – 64 oz"
  ],
  Produce: [
    "Apples – 7",
    "Oranges – 4",
    "Grapes – 1 bag",
    "Spinach – 10 oz",
    "Broccoli – 2 heads",
    "Green beans – 1 lb",
    "Tomatoes – 6",
    "Cucumbers – 3",
    "Lemons – 6"
  ],
  Carbs: [
    "Old-fashioned oats – 18 oz",
    "Jasmine rice – 2 lb",
    "Baby potatoes – 3 lb",
    "Whole wheat pitas – 8",
    "Whole wheat pasta – 1 box"
  ],
  Pantry: [
    "Olive oil",
    "Almonds",
    "Feta",
    "Tzatziki",
    "Garlic",
    "Oregano",
    "Paprika",
    "Cinnamon"
  ]
};


const CATEGORY_ICONS = {
  Breakfast: "☀",
  Lunch: "◐",
  Dinner: "☾",
  Snack: "◇"
};

const MEAL_SWAP_STORAGE_KEY = "med-cut-meal-swaps-v1";
const FLEX_MEAL_CAPS = [750, 750, 700, 700, 650, 650, 600, 600, 550, 550, 500, 500, 500];
const SWAP_WINDOW_DAYS = 14;
let activeSwapContext = null;


let activeRecipeFilter = "All";
let recipeSearchTerm = "";

function getRecipesByCategory(category) {
  return RECIPES.filter(recipe => recipe.category === category);
}

function getDailyRecipes(dayIndex) {
  const planDay = getEffectiveDay(MEAL_PLAN[clamp(dayIndex, 0, MEAL_PLAN.length - 1)]);
  return planDay.meals.map(meal => ({
    ...meal,
    recipe: meal.recipeId ? RECIPES.find(recipe => recipe.id === meal.recipeId) : null
  }));
}

function recipeSearchText(recipe) {
  return [
    recipe.name,
    recipe.category,
    recipe.description,
    ...(recipe.tags || []),
    ...recipe.ingredients
  ].join(" ").toLowerCase();
}

function recipeCardMarkup(recipe) {
  return `
    <article class="card recipe-card" data-category="${recipe.category}">
      <div class="recipe-card-hero">
        <div>
          <div class="recipe-category-label">${recipe.category}</div>
        </div>
        <div class="recipe-card-icon" aria-hidden="true">${CATEGORY_ICONS[recipe.category]}</div>
      </div>
      <div class="recipe-card-body">
        <h3>${recipe.name}</h3>
        <p class="recipe-card-description">${recipe.description}</p>
        <div class="recipe-card-macros">
          <div><span>Calories</span><strong>${recipe.calories}</strong></div>
          <div><span>Protein</span><strong>${recipe.protein}g</strong></div>
          <div><span>Carbs</span><strong>${recipe.carbs}g</strong></div>
          <div><span>Fat</span><strong>${recipe.fat}g</strong></div>
          <div><span>Fiber</span><strong>${recipe.fiber}g</strong></div>
        </div>
        <button class="recipe-open" data-open-recipe="${recipe.id}">View recipe</button>
      </div>
    </article>
  `;
}

function renderRecipeLibrary() {
  const term = recipeSearchTerm.trim().toLowerCase();
  const filtered = RECIPES.filter(recipe => {
    const categoryMatches = activeRecipeFilter === "All" || recipe.category === activeRecipeFilter;
    const searchMatches = !term || recipeSearchText(recipe).includes(term);
    return categoryMatches && searchMatches;
  });

  document.getElementById("recipeGrid").innerHTML = filtered.map(recipeCardMarkup).join("");
  document.getElementById("recipeEmpty").classList.toggle("hidden", filtered.length !== 0);
  document.getElementById("recipeResultsSummary").textContent =
    `${filtered.length} ${filtered.length === 1 ? "recipe" : "recipes"}${activeRecipeFilter === "All" ? "" : ` in ${activeRecipeFilter}`}`;

  document.querySelectorAll("[data-open-recipe]").forEach(button => {
    button.addEventListener("click", () => openRecipe(button.dataset.openRecipe));
  });
}

function setRecipeFilter(category) {
  activeRecipeFilter = category;
  document.querySelectorAll("[data-recipe-filter]").forEach(button => {
    button.classList.toggle("active", button.dataset.recipeFilter === category);
  });
  renderRecipeLibrary();
}

function openRecipe(recipeId) {
  const recipe = RECIPES.find(item => item.id === recipeId);
  if (!recipe) return;

  document.getElementById("modalCategory").textContent = recipe.category;
  document.getElementById("modalName").textContent = recipe.name;
  document.getElementById("modalDescription").textContent = recipe.description;
  document.getElementById("modalCalories").textContent = recipe.calories;
  document.getElementById("modalProtein").textContent = `${recipe.protein}g`;
  document.getElementById("modalCarbs").textContent = `${recipe.carbs}g`;
  document.getElementById("modalFat").textContent = `${recipe.fat}g`;
  document.getElementById("modalFiber").textContent = `${recipe.fiber}g`;
  document.getElementById("modalServings").textContent = recipe.servings;
  document.getElementById("modalPrep").textContent = recipe.prep;
  document.getElementById("modalCook").textContent = recipe.cook;
  document.getElementById("modalIngredients").innerHTML = recipe.ingredients.map(item => `<li>${item}</li>`).join("");
  document.getElementById("modalSteps").innerHTML = recipe.steps.map(step => `<li>${step}</li>`).join("");

  const dialog = document.getElementById("recipeDialog");
  document.body.classList.add("modal-open");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeRecipe() {
  const dialog = document.getElementById("recipeDialog");
  document.body.classList.remove("modal-open");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
}

function bindRecipeLibrary() {
  const search = document.getElementById("recipeSearch");
  search.addEventListener("input", () => {
    recipeSearchTerm = search.value;
    renderRecipeLibrary();
  });

  document.querySelectorAll("[data-recipe-filter]").forEach(button => {
    button.addEventListener("click", () => setRecipeFilter(button.dataset.recipeFilter));
  });

  document.querySelectorAll("[data-category-shortcut]").forEach(button => {
    button.addEventListener("click", () => {
      setRecipeFilter(button.dataset.categoryShortcut);
      document.getElementById("recipeGrid").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.getElementById("closeRecipeDialog").addEventListener("click", closeRecipe);
  document.getElementById("recipeDialog").addEventListener("click", event => {
    if (event.target === event.currentTarget) closeRecipe();
  });
  document.getElementById("recipeDialog").addEventListener("cancel", event => {
    event.preventDefault();
    closeRecipe();
  });

  renderRecipeLibrary();
}

let activePlanWeek = 1;

function portionLabel(portion) {
  const labels = { "0.75": "¾ serving", "1": "1 serving", "1.25": "1¼ servings", "1.5": "1½ servings" };
  return labels[String(portion)] || `${portion} servings`;
}

function currentProgramDayIndex() {
  return clamp(daysBetween(localDay(), parseLocalDate(PROGRAM.startDate)), 0, PROGRAM.totalDays - 1);
}


function roundMacro(value) {
  return Math.round(Number(value) * 10) / 10;
}

function getMealSwaps() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MEAL_SWAP_STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_) {
    return {};
  }
}

function saveMealSwaps(swaps) {
  localStorage.setItem(MEAL_SWAP_STORAGE_KEY, JSON.stringify(swaps));
}

function mealSwapKey(date, slotIndex) {
  return `${date}|${slotIndex}`;
}

function getMealSwap(date, slotIndex) {
  return getMealSwaps()[mealSwapKey(date, slotIndex)] || null;
}

function swapWindowEnd() {
  const end = localDay();
  end.setDate(end.getDate() + SWAP_WINDOW_DAYS);
  return end;
}

function canSwapDate(isoDate) {
  const date = parseLocalDate(isoDate);
  const today = localDay();
  const end = swapWindowEnd();
  const programStart = parseLocalDate(PROGRAM.startDate);
  const programEnd = parseLocalDate(MEAL_PLAN[MEAL_PLAN.length - 1].date);
  return date >= today && date <= end && date >= programStart && date <= programEnd;
}

function flexMealCapForWeek(week) {
  return FLEX_MEAL_CAPS[clamp(Number(week), 1, 13) - 1];
}

function nutritionForRecipe(recipe, portion) {
  return {
    calories: Math.round(recipe.calories * portion),
    protein: roundMacro(recipe.protein * portion),
    carbs: roundMacro(recipe.carbs * portion),
    fat: roundMacro(recipe.fat * portion),
    fiber: roundMacro(recipe.fiber * portion)
  };
}

function getEffectiveMeal(day, slotIndex) {
  const base = day.meals[slotIndex];
  const swap = getMealSwap(day.date, slotIndex);
  if (!swap) return { ...base, isSubstitution: false, swapType: null };

  if (swap.type === "recipe") {
    const recipe = RECIPES.find(item => item.id === swap.recipeId);
    if (!recipe) return { ...base, isSubstitution: false, swapType: null };
    const portion = Number(swap.portion) || base.portion || 1;
    return {
      ...base,
      recipeId: recipe.id,
      name: recipe.name,
      portion,
      ...nutritionForRecipe(recipe, portion),
      isSubstitution: true,
      swapType: "recipe"
    };
  }

  if (swap.type === "flex") {
    return {
      ...base,
      recipeId: null,
      name: swap.name || "Weekly Cheat / Flex Meal",
      portion: 1,
      calories: Number(swap.calories),
      protein: roundMacro(swap.protein),
      carbs: roundMacro(swap.carbs),
      fat: roundMacro(swap.fat),
      fiber: roundMacro(swap.fiber),
      isSubstitution: true,
      swapType: "flex"
    };
  }

  return { ...base, isSubstitution: false, swapType: null };
}

function calculateMealTotals(meals) {
  return ["calories", "protein", "carbs", "fat", "fiber"].reduce((totals, key) => {
    const value = meals.reduce((sum, meal) => sum + Number(meal[key] || 0), 0);
    totals[key] = key === "calories" ? Math.round(value) : roundMacro(value);
    return totals;
  }, {});
}

function getEffectiveDay(day) {
  const meals = day.meals.map((_, slotIndex) => getEffectiveMeal(day, slotIndex));
  return { ...day, meals, totals: calculateMealTotals(meals) };
}

function getFlexSwapForWeek(week, excludingKey = null) {
  const swaps = getMealSwaps();
  for (const [key, swap] of Object.entries(swaps)) {
    if (key === excludingKey || !swap || swap.type !== "flex") continue;
    const [date, slotText] = key.split("|");
    const day = MEAL_PLAN.find(item => item.date === date);
    if (day && day.week === Number(week)) {
      const slotIndex = Number(slotText);
      return { key, day, slotIndex, swap };
    }
  }
  return null;
}

function replaceMealSwap(date, slotIndex, swap) {
  const swaps = getMealSwaps();
  swaps[mealSwapKey(date, slotIndex)] = swap;
  saveMealSwaps(swaps);
}

function removeMealSwap(date, slotIndex) {
  const swaps = getMealSwaps();
  delete swaps[mealSwapKey(date, slotIndex)];
  saveMealSwaps(swaps);
}

function refreshMealViews() {
  renderProgramDay();
  renderPlanWeek(activePlanWeek);
}

function swapWindowLabel() {
  const today = localDay();
  const end = swapWindowEnd();
  const programEnd = parseLocalDate(MEAL_PLAN[MEAL_PLAN.length - 1].date);
  const visibleEnd = end < programEnd ? end : programEnd;
  return `${today.toLocaleDateString(undefined, { month: "short", day: "numeric" })}–${visibleEnd.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
}

function recipeOptionsForSwap(day, baseMeal, currentMeal) {
  const usedThisWeek = new Set(
    MEAL_PLAN
      .filter(item => item.week === day.week)
      .flatMap(item => item.meals)
      .filter(item => item.category === baseMeal.category)
      .map(item => item.recipeId)
  );

  return RECIPES
    .filter(recipe => recipe.category === baseMeal.category)
    .sort((a, b) => {
      const aWeek = usedThisWeek.has(a.id) ? 0 : 1;
      const bWeek = usedThisWeek.has(b.id) ? 0 : 1;
      return aWeek - bWeek || a.name.localeCompare(b.name);
    })
    .map(recipe => ({ recipe, usedThisWeek: usedThisWeek.has(recipe.id), selected: recipe.id === currentMeal.recipeId }));
}

function updateRecipeSwapPreview() {
  const recipe = RECIPES.find(item => item.id === document.getElementById("swapRecipeSelect").value);
  const portion = Number(document.getElementById("swapPortionSelect").value);
  if (!recipe || !Number.isFinite(portion)) return;
  const nutrition = nutritionForRecipe(recipe, portion);
  document.getElementById("swapRecipePreview").innerHTML = [
    ["Calories", nutrition.calories],
    ["Protein", `${nutrition.protein}g`],
    ["Carbs", `${nutrition.carbs}g`],
    ["Fat", `${nutrition.fat}g`],
    ["Fiber", `${nutrition.fiber}g`]
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function openSwapDialog(date, slotIndex) {
  const day = MEAL_PLAN.find(item => item.date === date);
  if (!day || !day.meals[slotIndex]) return;
  activeSwapContext = { day, slotIndex };

  const baseMeal = day.meals[slotIndex];
  const currentMeal = getEffectiveMeal(day, slotIndex);
  const existingSwap = getMealSwap(date, slotIndex);
  const editable = canSwapDate(date);
  const cap = flexMealCapForWeek(day.week);
  const contextKey = mealSwapKey(date, slotIndex);
  const flexUsedElsewhere = getFlexSwapForWeek(day.week, contextKey);

  document.getElementById("swapDialogTitle").textContent = `${baseMeal.category} on ${formatDate(date, { weekday: "long", month: "long", day: "numeric" })}`;
  document.getElementById("swapDialogSubtitle").textContent = `${baseMeal.time} · Week ${day.week} · swaps are available through 14 days ahead`;
  document.getElementById("swapCurrentMeal").textContent = currentMeal.name;
  document.getElementById("swapCurrentMacros").textContent = `${currentMeal.calories} cal · ${currentMeal.protein}g protein · ${currentMeal.carbs}g carbs · ${currentMeal.fat}g fat`;

  const options = recipeOptionsForSwap(day, baseMeal, currentMeal);
  const select = document.getElementById("swapRecipeSelect");
  select.innerHTML = options.map(({ recipe, usedThisWeek, selected }) =>
    `<option value="${recipe.id}" ${selected ? "selected" : ""}>${recipe.name} — ${recipe.calories} cal${usedThisWeek ? " · used this week" : ""}</option>`
  ).join("");
  if (![...select.options].some(option => option.selected) && select.options.length) select.selectedIndex = 0;

  const portionSelect = document.getElementById("swapPortionSelect");
  const preferredPortion = existingSwap && existingSwap.type === "recipe" ? Number(existingSwap.portion) : Number(baseMeal.portion || 1);
  portionSelect.value = [0.75, 1, 1.25, 1.5].includes(preferredPortion) ? String(preferredPortion) : "1";
  updateRecipeSwapPreview();

  document.getElementById("flexMealCapHeading").textContent = `Up to ${cap} calories`;
  document.getElementById("flexCalories").max = cap;
  document.getElementById("flexCalories").value = existingSwap && existingSwap.type === "flex" ? existingSwap.calories : cap;
  document.getElementById("flexMealName").value = existingSwap && existingSwap.type === "flex" ? existingSwap.name : "";
  document.getElementById("flexProtein").value = existingSwap && existingSwap.type === "flex" ? existingSwap.protein : "";
  document.getElementById("flexCarbs").value = existingSwap && existingSwap.type === "flex" ? existingSwap.carbs : "";
  document.getElementById("flexFat").value = existingSwap && existingSwap.type === "flex" ? existingSwap.fat : "";
  document.getElementById("flexFiber").value = existingSwap && existingSwap.type === "flex" ? existingSwap.fiber : "";
  document.getElementById("flexMealMessage").textContent = "";

  const flexStatus = document.getElementById("flexMealStatus");
  const flexSave = document.getElementById("saveFlexSwap");
  if (flexUsedElsewhere) {
    flexStatus.textContent = "Already used";
    flexSave.disabled = true;
    document.getElementById("flexMealMessage").textContent = `This week's flex meal is on ${formatDate(flexUsedElsewhere.day.date, { weekday: "short", month: "short", day: "numeric" })} at ${flexUsedElsewhere.day.meals[flexUsedElsewhere.slotIndex].time}. Restore that meal first to move it.`;
  } else {
    flexStatus.textContent = existingSwap && existingSwap.type === "flex" ? "Editing" : "Available";
    flexSave.disabled = !editable;
  }

  document.getElementById("saveRecipeSwap").disabled = !editable;
  document.getElementById("restoreScheduledMeal").classList.toggle("hidden", !existingSwap);
  document.getElementById("restoreScheduledMeal").disabled = !editable;
  document.getElementById("swapLockMessage").textContent = editable
    ? `Editable window: ${swapWindowLabel()}`
    : `This meal is locked. You can edit today through ${swapWindowEnd().toLocaleDateString(undefined, { month: "long", day: "numeric" })}.`;

  const dialog = document.getElementById("swapDialog");
  document.body.classList.add("modal-open");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeSwapDialog() {
  const dialog = document.getElementById("swapDialog");
  document.body.classList.remove("modal-open");
  if (typeof dialog.close === "function" && dialog.open) dialog.close();
  else dialog.removeAttribute("open");
  activeSwapContext = null;
}

function saveSelectedRecipeSwap() {
  if (!activeSwapContext) return;
  const { day, slotIndex } = activeSwapContext;
  if (!canSwapDate(day.date)) return;
  const recipeId = document.getElementById("swapRecipeSelect").value;
  const portion = Number(document.getElementById("swapPortionSelect").value);
  if (!RECIPES.some(recipe => recipe.id === recipeId) || !Number.isFinite(portion)) return;
  replaceMealSwap(day.date, slotIndex, { type: "recipe", recipeId, portion, updatedAt: new Date().toISOString() });
  closeSwapDialog();
  refreshMealViews();
}

function saveWeeklyFlexSwap() {
  if (!activeSwapContext) return;
  const { day, slotIndex } = activeSwapContext;
  if (!canSwapDate(day.date)) return;
  const currentKey = mealSwapKey(day.date, slotIndex);
  const existing = getFlexSwapForWeek(day.week, currentKey);
  const message = document.getElementById("flexMealMessage");
  if (existing) {
    message.textContent = "This week's flex meal is already assigned to another meal.";
    return;
  }

  const cap = flexMealCapForWeek(day.week);
  const name = document.getElementById("flexMealName").value.trim() || "Weekly Cheat / Flex Meal";
  const calories = Number(document.getElementById("flexCalories").value);
  const protein = Number(document.getElementById("flexProtein").value);
  const carbs = Number(document.getElementById("flexCarbs").value);
  const fat = Number(document.getElementById("flexFat").value);
  const fiber = Number(document.getElementById("flexFiber").value);
  const values = [calories, protein, carbs, fat, fiber];

  if (!values.every(Number.isFinite) || calories < 100 || calories > cap || [protein, carbs, fat, fiber].some(value => value < 0)) {
    message.textContent = `Enter label nutrition for every field and keep calories between 100 and the ${cap}-calorie weekly cap.`;
    return;
  }

  replaceMealSwap(day.date, slotIndex, {
    type: "flex",
    name,
    calories: Math.round(calories),
    protein: roundMacro(protein),
    carbs: roundMacro(carbs),
    fat: roundMacro(fat),
    fiber: roundMacro(fiber),
    updatedAt: new Date().toISOString()
  });
  closeSwapDialog();
  refreshMealViews();
}

function restoreOriginalMeal() {
  if (!activeSwapContext) return;
  const { day, slotIndex } = activeSwapContext;
  if (!canSwapDate(day.date)) return;
  removeMealSwap(day.date, slotIndex);
  closeSwapDialog();
  refreshMealViews();
}

function bindMealSwaps() {
  document.getElementById("swapRecipeSelect").addEventListener("change", updateRecipeSwapPreview);
  document.getElementById("swapPortionSelect").addEventListener("change", updateRecipeSwapPreview);
  document.getElementById("saveRecipeSwap").addEventListener("click", saveSelectedRecipeSwap);
  document.getElementById("saveFlexSwap").addEventListener("click", saveWeeklyFlexSwap);
  document.getElementById("restoreScheduledMeal").addEventListener("click", restoreOriginalMeal);
  document.getElementById("closeSwapDialog").addEventListener("click", closeSwapDialog);
  document.getElementById("swapDialog").addEventListener("click", event => {
    if (event.target === event.currentTarget) closeSwapDialog();
  });
  document.getElementById("swapDialog").addEventListener("cancel", event => {
    event.preventDefault();
    closeSwapDialog();
  });
  document.getElementById("swapWindowNote").innerHTML = `<strong>Swap window:</strong> meals can be changed from today through 14 days ahead (${swapWindowLabel()}). Past meals and later weeks stay locked until they enter the window.`;
}

function planMealMarkup(day, meal, slotIndex) {
  const editable = canSwapDate(day.date);
  const badge = meal.isSubstitution
    ? `<span class="swap-badge ${meal.swapType === "flex" ? "flex" : ""}">${meal.swapType === "flex" ? "Weekly flex meal" : "Substituted"}</span>`
    : "";
  const nameControl = meal.recipeId
    ? `<button class="plan-meal-name" data-open-recipe="${meal.recipeId}">${meal.name}</button>`
    : `<div class="plan-meal-name">${meal.name}</div>`;
  return `
    <div class="plan-meal ${meal.isSubstitution ? "swapped" : ""} ${meal.swapType === "flex" ? "flex-swapped" : ""}">
      <div class="plan-meal-time">${meal.time}</div>
      <div class="plan-meal-category">${meal.category}</div>
      <div class="meal-name-wrap">${nameControl}${badge}</div>
      <div class="plan-portion">${meal.swapType === "flex" ? "1 flex meal" : portionLabel(meal.portion)}</div>
      <div class="plan-macro calorie-macro"><small>Calories</small>${meal.calories}</div>
      <div class="plan-macro"><small>Protein</small>${meal.protein}g</div>
      <div class="plan-macro optional-macro"><small>Carbs</small>${meal.carbs}g</div>
      <div class="plan-macro optional-macro"><small>Fat</small>${meal.fat}g</div>
      <button class="swap-meal-button" data-swap-date="${day.date}" data-swap-slot="${slotIndex}" ${editable ? "" : "disabled"} title="${editable ? "Substitute this meal" : "Meal substitutions are available from today through 14 days ahead"}">${meal.isSubstitution ? "Change" : editable ? "Swap" : "Locked"}</button>
    </div>
  `;
}

function renderPlanWeek(weekNumber) {
  activePlanWeek = clamp(Number(weekNumber), 1, 13);
  const sourceDays = MEAL_PLAN.filter(day => day.week === activePlanWeek);
  const days = sourceDays.map(getEffectiveDay);
  const currentIndex = currentProgramDayIndex();
  const currentWeek = MEAL_PLAN[currentIndex].week;

  document.querySelectorAll("[data-plan-week]").forEach(button => {
    button.classList.toggle("active", Number(button.dataset.planWeek) === activePlanWeek);
    button.classList.toggle("current", Number(button.dataset.planWeek) === currentWeek);
  });

  const first = days[0];
  const last = days[days.length - 1];
  const averages = ["calories", "protein", "carbs", "fat", "fiber"].reduce((result, key) => {
    result[key] = days.reduce((sum, day) => sum + day.totals[key], 0) / days.length;
    return result;
  }, {});

  document.getElementById("weekSummary").innerHTML = `
    <div class="week-summary-main">
      <p class="eyebrow">Week ${activePlanWeek}</p>
      <h2>${formatDate(first.date, { month: "long", day: "numeric" })}–${formatDate(last.date, { month: "long", day: "numeric", year: "numeric" })}</h2>
      <p class="muted">${days.length} planned days · ${first.targetCalories.toLocaleString()} calorie target</p>
    </div>
    <div class="week-summary-stat"><span>Average plan</span><strong>${Math.round(averages.calories).toLocaleString()} cal</strong></div>
    <div class="week-summary-stat"><span>Average protein</span><strong>${averages.protein.toFixed(0)}g</strong></div>
    <div class="week-summary-stat"><span>Target protein</span><strong>${first.targetProtein}g</strong></div>
  `;

  const flexUse = getFlexSwapForWeek(activePlanWeek);
  const cap = flexMealCapForWeek(activePlanWeek);
  const weekHasEditableMeal = sourceDays.some(day => canSwapDate(day.date));
  document.getElementById("weekFlexCard").innerHTML = `
    <div>
      <p class="eyebrow">Weekly cheat / flex meal</p>
      <h2>One flexible meal for Week ${activePlanWeek}</h2>
      <p class="muted">Replace any unlocked meal, stay at or below the calorie cap, and enter label macros for accurate daily totals.</p>
    </div>
    <div class="flex-card-cap"><span>Calorie cap</span><strong>${cap} calories</strong></div>
    <div class="flex-card-status ${flexUse ? "used" : weekHasEditableMeal ? "" : "locked"}">
      <span>Status</span>
      <strong>${flexUse ? `Used ${formatDate(flexUse.day.date, { month: "short", day: "numeric" })}` : weekHasEditableMeal ? "Available" : "Outside swap window"}</strong>
    </div>
  `;

  document.getElementById("weekDays").innerHTML = days.map(day => {
    const isToday = day.day === currentIndex + 1;
    const calorieDifference = day.totals.calories - day.targetCalories;
    const differenceLabel = calorieDifference === 0
      ? "on target"
      : `${Math.abs(calorieDifference)} cal ${calorieDifference > 0 ? "over" : "under"} target`;
    return `
      <article class="card plan-day ${isToday ? "current-day" : ""}">
        <header class="plan-day-header">
          <div class="plan-day-title">
            <div class="plan-day-number">${day.day}</div>
            <div>
              <h3>${formatDate(day.date, { weekday: "long", month: "long", day: "numeric" })}${isToday ? " · Today" : ""}</h3>
              <p>Day ${day.day} of 90${canSwapDate(day.date) ? " · swaps unlocked" : ""}</p>
            </div>
          </div>
          <div class="day-target"><strong>${day.targetCalories.toLocaleString()} cal target</strong><span>${day.targetProtein}g protein target</span></div>
        </header>
        <div class="plan-meals">${day.meals.map((meal, slotIndex) => planMealMarkup(day, meal, slotIndex)).join("")}</div>
        <footer class="plan-day-total">
          <div class="plan-total-label"><strong>Daily total</strong><span>${differenceLabel}</span></div>
          <div class="plan-total-value calorie-total"><small>Calories</small>${day.totals.calories.toLocaleString()}</div>
          <div class="plan-total-value protein-total"><small>Protein</small>${day.totals.protein}g</div>
          <div class="plan-total-value"><small>Carbs</small>${day.totals.carbs}g</div>
          <div class="plan-total-value optional-macro"><small>Fat</small>${day.totals.fat}g</div>
          <div class="plan-total-value optional-macro"><small>Fiber</small>${day.totals.fiber}g</div>
        </footer>
      </article>
    `;
  }).join("");

  document.querySelectorAll("#weekDays [data-open-recipe]").forEach(button => {
    button.addEventListener("click", () => openRecipe(button.dataset.openRecipe));
  });
  document.querySelectorAll("#weekDays [data-swap-date]").forEach(button => {
    button.addEventListener("click", () => openSwapDialog(button.dataset.swapDate, Number(button.dataset.swapSlot)));
  });
}

function bindPlan() {
  const currentWeek = MEAL_PLAN[currentProgramDayIndex()].week;
  const selector = document.getElementById("weekSelector");
  selector.innerHTML = Array.from({ length: 13 }, (_, index) => {
    const week = index + 1;
    return `<button class="week-button ${week === currentWeek ? "current" : ""}" data-plan-week="${week}">Week ${week}</button>`;
  }).join("");
  selector.querySelectorAll("[data-plan-week]").forEach(button => {
    button.addEventListener("click", () => renderPlanWeek(button.dataset.planWeek));
  });
  renderPlanWeek(currentWeek);
}

const WEIGHT_STORAGE_KEY = "med-cut-weight-entries-v2";

function parseLocalDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function localIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function localDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function clamp(number, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, number));
}

function daysBetween(first, second) {
  return Math.floor((localDay(first) - localDay(second)) / 86400000);
}

function targetWeightForDate(date) {
  const dayIndex = clamp(daysBetween(date, parseLocalDate(PROGRAM.startDate)), 0, PROGRAM.totalDays - 1);
  return PROGRAM.startWeight -
    ((PROGRAM.startWeight - PROGRAM.goalWeight) * dayIndex / (PROGRAM.totalDays - 1));
}

function formatDate(iso, options = { month: "short", day: "numeric", year: "numeric" }) {
  return parseLocalDate(iso).toLocaleDateString(undefined, options);
}

function getWeights() {
  let entries = [];
  try {
    entries = JSON.parse(localStorage.getItem(WEIGHT_STORAGE_KEY) || "[]");
  } catch (_) {
    entries = [];
  }

  // Import entries saved by the first app version.
  Object.keys(localStorage).forEach(key => {
    const match = key.match(/^day-(\d{4}-\d{2}-\d{2})-weight$/);
    if (!match) return;
    const weight = Number(localStorage.getItem(key));
    if (!Number.isFinite(weight)) return;
    if (!entries.some(entry => entry.date === match[1])) {
      entries.push({ date: match[1], weight });
    }
  });

  return entries
    .filter(entry => entry && entry.date && Number.isFinite(Number(entry.weight)))
    .map(entry => ({ date: entry.date, weight: Number(entry.weight) }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function saveWeights(entries) {
  localStorage.setItem(WEIGHT_STORAGE_KEY, JSON.stringify(entries));
}

function saveWeight(date, weight) {
  if (!date || !Number.isFinite(weight) || weight < 80 || weight > 400) {
    return false;
  }
  const entries = getWeights().filter(entry => entry.date !== date);
  entries.push({ date, weight: Math.round(weight * 10) / 10 });
  entries.sort((a, b) => a.date.localeCompare(b.date));
  saveWeights(entries);
  return true;
}

function deleteWeight(date) {
  saveWeights(getWeights().filter(entry => entry.date !== date));
  renderProgress();
}

function setActiveTab(tabName) {
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.dataset.tab === tabName);
  });
  document.querySelectorAll("[data-tab-link]").forEach(button => {
    button.classList.toggle("active", button.dataset.tabLink === tabName);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", `#${tabName}`);
  if (tabName === "progress") {
    requestAnimationFrame(renderProgress);
  }
  if (tabName === "plan") {
    requestAnimationFrame(() => renderPlanWeek(activePlanWeek));
  }
  if (tabName === "meals") {
    requestAnimationFrame(renderRecipeLibrary);
  }
}

function updateClock() {
  const now = new Date();
  const hour = now.getHours();
  document.getElementById("greeting").textContent =
    `${hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"}, Luke`;

  document.getElementById("liveDate").textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  document.getElementById("liveTime").textContent = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });
}

function renderProgramDay() {
  const today = localDay();
  const elapsed = daysBetween(today, parseLocalDate(PROGRAM.startDate));
  const dayIndex = clamp(elapsed, 0, PROGRAM.totalDays - 1);
  const displayDay = dayIndex + 1;
  const weekIndex = clamp(Math.floor(dayIndex / 7), 0, PROGRAM.weeklyTargets.length - 1);
  const target = PROGRAM.weeklyTargets[weekIndex];
  const completion = Math.round((displayDay / PROGRAM.totalDays) * 100);
  const targetCenter = targetWeightForDate(today);
  const targetLow = Math.max(PROGRAM.goalWeight, targetCenter - 0.3);
  const targetHigh = targetCenter + 0.3;

  document.getElementById("dayLabel").textContent = `Day ${displayDay} of ${PROGRAM.totalDays}`;
  document.getElementById("weekLabel").textContent = `Week ${weekIndex + 1}`;
  document.getElementById("progressFill").style.width = `${completion}%`;
  document.getElementById("progressPercent").textContent = `${completion}% complete`;
  document.getElementById("daysRemaining").textContent = `${PROGRAM.totalDays - displayDay} days remaining`;
  document.getElementById("targetWeight").textContent = `${targetLow.toFixed(1)}–${targetHigh.toFixed(1)} lb`;
  document.getElementById("calorieTarget").textContent = target.calories.toLocaleString();
  document.getElementById("proteinTarget").textContent = `${target.protein}g protein`;
  document.getElementById("proteinTargetSmall").textContent = `${target.protein}g protein`;
  document.getElementById("groceryWeekHeading").textContent = `Week ${weekIndex + 1} grocery list`;

  const planDay = MEAL_PLAN[dayIndex];
  const meals = getDailyRecipes(dayIndex);
  const mealMarkup = meals.map((meal, slotIndex) => {
    const nameControl = meal.recipeId
      ? `<button class="meal-name-button" data-open-recipe="${meal.recipeId}">${meal.name}<span class="dashboard-portion">${meal.swapType === "flex" ? "weekly flex meal" : portionLabel(meal.portion)}</span></button>`
      : `<div class="meal-name-button static-meal-name">${meal.name}<span class="dashboard-portion">weekly flex meal</span></div>`;
    return `
      <div class="meal dashboard-meal ${meal.isSubstitution ? "swapped" : ""}">
        <div class="meal-type">${meal.time}</div>
        <div>${nameControl}${meal.isSubstitution ? `<span class="swap-badge ${meal.swapType === "flex" ? "flex" : ""}">${meal.swapType === "flex" ? "Flex meal" : "Substituted"}</span>` : ""}</div>
        <div class="meal-macros">${meal.calories} cal · ${meal.protein}g protein</div>
        <button class="dashboard-swap-button" data-swap-date="${planDay.date}" data-swap-slot="${slotIndex}" ${canSwapDate(planDay.date) ? "" : "disabled"}>${meal.isSubstitution ? "Change" : "Swap"}</button>
      </div>
    `;
  }).join("");

  document.getElementById("mealList").innerHTML = mealMarkup;
  document.querySelectorAll("#mealList [data-open-recipe]").forEach(element => {
    element.addEventListener("click", event => {
      event.stopPropagation();
      openRecipe(element.dataset.openRecipe);
    });
  });
  document.querySelectorAll("#mealList [data-swap-date]").forEach(button => {
    button.addEventListener("click", () => openSwapDialog(button.dataset.swapDate, Number(button.dataset.swapSlot)));
  });

  document.getElementById("groceryList").innerHTML = Object.entries(groceries)
    .map(([group, items]) => `
      <div class="grocery-group">
        <h3>${group}</h3>
        <ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>
      </div>
    `).join("");
}

function renderHabits() {
  const todayKey = localIsoDate();
  document.querySelectorAll("[data-habit]").forEach(box => {
    const key = `habit-${todayKey}-${box.dataset.habit}`;
    box.checked = localStorage.getItem(key) === "true";
    box.addEventListener("change", () => {
      localStorage.setItem(key, String(box.checked));
    });
  });
}

function sevenDayAverage(entries) {
  if (!entries.length) return null;
  const latestDate = parseLocalDate(entries[entries.length - 1].date);
  const recent = entries.filter(entry => {
    const difference = daysBetween(latestDate, parseLocalDate(entry.date));
    return difference >= 0 && difference <= 6;
  });
  return recent.reduce((sum, entry) => sum + entry.weight, 0) / recent.length;
}

function renderSummary(entries) {
  const latest = entries[entries.length - 1];
  const latestWeight = latest ? latest.weight : null;
  const totalLost = latestWeight === null ? 0 : PROGRAM.startWeight - latestWeight;
  const remaining = latestWeight === null
    ? PROGRAM.startWeight - PROGRAM.goalWeight
    : Math.max(0, latestWeight - PROGRAM.goalWeight);
  const average = sevenDayAverage(entries);

  document.getElementById("dashboardLatestWeight").textContent =
    latest ? `${latest.weight.toFixed(1)} lb` : "—";
  document.getElementById("dashboardLatestDate").textContent =
    latest ? `Logged ${formatDate(latest.date)}` : "Log your first weigh-in";
  document.getElementById("dashboardPoundsLost").textContent = Math.max(0, totalLost).toFixed(1);

  document.getElementById("progressLatestWeight").textContent =
    latest ? `${latest.weight.toFixed(1)} lb` : "—";
  document.getElementById("progressLatestDate").textContent =
    latest ? formatDate(latest.date) : "No entries yet";
  document.getElementById("totalLost").textContent = `${Math.max(0, totalLost).toFixed(1)} lb`;
  document.getElementById("remainingWeight").textContent = `${remaining.toFixed(1)} lb`;
  document.getElementById("sevenDayAverage").textContent =
    average === null ? "—" : `${average.toFixed(1)} lb`;

  const todayEntry = entries.find(entry => entry.date === localIsoDate());
  document.getElementById("dashboardWeightInput").value = todayEntry ? todayEntry.weight : "";
}

function renderHistory(entries) {
  const container = document.getElementById("weightHistory");
  if (!entries.length) {
    container.innerHTML = `<p class="empty-history">No weigh-ins have been logged yet.</p>`;
    return;
  }

  container.innerHTML = [...entries].reverse().map(entry => {
    const change = PROGRAM.startWeight - entry.weight;
    const changeText = change > 0
      ? `${change.toFixed(1)} lb down`
      : change < 0
        ? `${Math.abs(change).toFixed(1)} lb up`
        : "Starting point";
    return `
      <div class="history-row">
        <div>
          <div class="history-date">${formatDate(entry.date, { weekday: "short", month: "short", day: "numeric" })}</div>
          <small class="muted">${changeText}</small>
        </div>
        <div class="history-weight">${entry.weight.toFixed(1)} lb</div>
        <button class="delete-entry" data-delete-date="${entry.date}" aria-label="Delete ${entry.date} entry">Delete</button>
      </div>
    `;
  }).join("");

  container.querySelectorAll("[data-delete-date]").forEach(button => {
    button.addEventListener("click", () => deleteWeight(button.dataset.deleteDate));
  });
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawWeightChart(canvas, entries, compact = false) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);

  const width = rect.width;
  const height = rect.height;
  const padding = compact
    ? { top: 15, right: 12, bottom: 24, left: 40 }
    : { top: 24, right: 22, bottom: 44, left: 54 };

  ctx.clearRect(0, 0, width, height);

  if (entries.length < 1) return;

  const displayEntries = compact ? entries.slice(-14) : entries;
  const firstDate = parseLocalDate(displayEntries[0].date);
  const lastDate = parseLocalDate(displayEntries[displayEntries.length - 1].date);
  const minimumRangeEnd = new Date(firstDate);
  minimumRangeEnd.setDate(minimumRangeEnd.getDate() + 7);
  const rangeEnd = lastDate > minimumRangeEnd ? lastDate : minimumRangeEnd;
  const totalDateSpan = Math.max(1, daysBetween(rangeEnd, firstDate));

  const actualValues = displayEntries.map(entry => entry.weight);
  const targetValues = displayEntries.map(entry => targetWeightForDate(parseLocalDate(entry.date)));
  const allValues = [...actualValues, ...targetValues];
  let minWeight = Math.floor(Math.min(...allValues) - 1);
  let maxWeight = Math.ceil(Math.max(...allValues) + 1);
  if (maxWeight - minWeight < 5) {
    const center = (maxWeight + minWeight) / 2;
    minWeight = Math.floor(center - 2.5);
    maxWeight = Math.ceil(center + 2.5);
  }

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const xForDate = date => padding.left + (daysBetween(date, firstDate) / totalDateSpan) * plotWidth;
  const yForWeight = weight =>
    padding.top + ((maxWeight - weight) / (maxWeight - minWeight)) * plotHeight;

  // Grid and labels.
  ctx.font = `${compact ? 10 : 11}px system-ui`;
  ctx.fillStyle = "#6b756e";
  ctx.strokeStyle = "#e1e6e1";
  ctx.lineWidth = 1;

  const horizontalSteps = compact ? 3 : 5;
  for (let index = 0; index <= horizontalSteps; index += 1) {
    const value = minWeight + ((maxWeight - minWeight) * index / horizontalSteps);
    const y = yForWeight(value);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(value.toFixed(0), padding.left - 8, y);
  }

  if (!compact) {
    const labelCount = Math.min(5, displayEntries.length);
    for (let index = 0; index < labelCount; index += 1) {
      const entryIndex = Math.round(index * (displayEntries.length - 1) / Math.max(1, labelCount - 1));
      const entry = displayEntries[entryIndex];
      const x = xForDate(parseLocalDate(entry.date));
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(
        formatDate(entry.date, { month: "short", day: "numeric" }),
        x,
        height - padding.bottom + 13
      );
    }
  }

  // Target line.
  ctx.strokeStyle = "#c58b2a";
  ctx.lineWidth = compact ? 2 : 2.25;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  displayEntries.forEach((entry, index) => {
    const x = xForDate(parseLocalDate(entry.date));
    const y = yForWeight(targetWeightForDate(parseLocalDate(entry.date)));
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  // Actual line.
  ctx.strokeStyle = "#173a2c";
  ctx.lineWidth = compact ? 3 : 3.25;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  displayEntries.forEach((entry, index) => {
    const x = xForDate(parseLocalDate(entry.date));
    const y = yForWeight(entry.weight);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Actual points.
  displayEntries.forEach(entry => {
    const x = xForDate(parseLocalDate(entry.date));
    const y = yForWeight(entry.weight);
    ctx.fillStyle = "#fffdf8";
    ctx.strokeStyle = "#173a2c";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x, y, compact ? 3.5 : 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
}

function renderProgress() {
  const entries = getWeights();
  renderSummary(entries);
  renderHistory(entries);

  const chartEmpty = document.getElementById("chartEmpty");
  const miniEmpty = document.getElementById("miniChartEmpty");
  chartEmpty.classList.toggle("hidden", entries.length > 0);
  miniEmpty.classList.toggle("hidden", entries.length > 1);

  requestAnimationFrame(() => {
    drawWeightChart(document.getElementById("weightChart"), entries, false);
    drawWeightChart(document.getElementById("miniWeightChart"), entries, true);
  });
}

function bindWeightForms() {
  const today = localIsoDate();
  document.getElementById("entryDate").value = today;
  document.getElementById("entryDate").max = localIsoDate(new Date(Date.now() + 86400000));

  document.getElementById("dashboardSaveWeight").addEventListener("click", () => {
    const value = Number(document.getElementById("dashboardWeightInput").value);
    const message = document.getElementById("dashboardWeightMessage");
    if (!saveWeight(today, value)) {
      message.textContent = "Enter a valid weight between 80 and 400 lb.";
      return;
    }
    message.textContent = `Saved ${value.toFixed(1)} lb for today.`;
    renderProgress();
  });

  document.getElementById("weightForm").addEventListener("submit", event => {
    event.preventDefault();
    const date = document.getElementById("entryDate").value;
    const value = Number(document.getElementById("entryWeight").value);
    const message = document.getElementById("progressFormMessage");
    if (!saveWeight(date, value)) {
      message.textContent = "Enter a valid date and weight between 80 and 400 lb.";
      return;
    }
    message.textContent = `Saved ${value.toFixed(1)} lb for ${formatDate(date)}.`;
    document.getElementById("entryWeight").value = "";
    renderProgress();
  });

  document.getElementById("clearWeights").addEventListener("click", () => {
    if (!getWeights().length) return;
    if (window.confirm("Delete every saved weigh-in from this device?")) {
      saveWeights([]);
      renderProgress();
      document.getElementById("progressFormMessage").textContent = "All weigh-ins were cleared.";
    }
  });
}

function bindNavigation() {
  document.querySelectorAll("[data-tab-link]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      setActiveTab(button.dataset.tabLink);
    });
  });

  const requestedTab = location.hash.replace("#", "");
  if (["dashboard", "plan", "progress", "meals", "groceries"].includes(requestedTab)) {
    setActiveTab(requestedTab);
  }
}

function bindInstall() {
  let deferredPrompt;
  const installButton = document.getElementById("installBtn");

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.classList.remove("hidden");
  });

  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.classList.add("hidden");
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
  }
}

renderProgramDay();
renderHabits();
bindRecipeLibrary();
bindPlan();
bindMealSwaps();
bindNavigation();
bindWeightForms();
bindInstall();
registerServiceWorker();
updateClock();
setInterval(updateClock, 1000);
renderProgress();

window.addEventListener("resize", () => {
  clearTimeout(window.__chartResizeTimer);
  window.__chartResizeTimer = setTimeout(renderProgress, 120);
});
