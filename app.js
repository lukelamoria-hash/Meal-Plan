const PROGRAM = {
  startDate: "2026-07-11",
  totalDays: 90,
  startWeight: 178,
  goalWeight: 155,
  cutEndDate: "2026-09-10",
  recompStartDate: "2026-09-11",
  programEndDate: "2026-10-08",
  maintenanceDefault: 2200,
  cutProtein: 180,
  recompProtein: 165,
  cutCalorieSteps: [2000, 2000, 1900, 1900, 1800, 1800, 1700, 1700, 1650]
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
const FLEX_MEAL_CAPS = [700, 700, 650, 650, 600, 600, 550, 550, 550, 750, 750, 750, 750];
const SWAP_WINDOW_DAYS = 14;
const SHAKE_FLAVOR_STORAGE_KEY = "med-cut-fairlife-flavor-v1";
const FAIRLIFE_NUTRITION = {
  chocolate: { label: "Chocolate", calories: 150, protein: 30, carbs: 4, fat: 2.5, fiber: 1 },
  vanilla: { label: "Vanilla", calories: 150, protein: 30, carbs: 3, fat: 2.5, fiber: 0 }
};
const WORK_DAYS = new Set([0, 4, 5, 6]); // Sunday, Monday, Friday, Saturday
const WORK_SHIFT = "3:00–9:00 AM";
const MAINTENANCE_CALORIES_STORAGE_KEY = "med-cut-maintenance-calories-v1";
const BASE_MEAL_PLAN = JSON.parse(JSON.stringify(MEAL_PLAN));
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
        <button class="recipe-open" data-open-recipe="${recipe.id}" data-recipe-portion="1">View recipe</button>
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
    button.addEventListener("click", () => openRecipe(button.dataset.openRecipe, Number(button.dataset.recipePortion || 1)));
  });
}

function setRecipeFilter(category) {
  activeRecipeFilter = category;
  document.querySelectorAll("[data-recipe-filter]").forEach(button => {
    button.classList.toggle("active", button.dataset.recipeFilter === category);
  });
  renderRecipeLibrary();
}

function parseIngredientQuantity(value) {
  const text = String(value).trim();
  if (/^\d+\s+\d+\/\d+$/.test(text)) {
    const [whole, fraction] = text.split(/\s+/);
    const [numerator, denominator] = fraction.split("/").map(Number);
    return Number(whole) + numerator / denominator;
  }
  if (/^\d+\/\d+$/.test(text)) {
    const [numerator, denominator] = text.split("/").map(Number);
    return numerator / denominator;
  }
  return Number(text);
}

function formatScaledQuantity(value, unit = "") {
  const rounded = Math.round(Number(value) * 100) / 100;
  if (!Number.isFinite(rounded)) return String(value);

  const preciseUnits = new Set(["g", "kg", "ml", "l", "oz", "lb"]);
  if (preciseUnits.has(String(unit).toLowerCase())) {
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(/\.0$/, "");
  }

  const whole = Math.floor(rounded + 1e-9);
  const remainder = rounded - whole;
  const fractions = [
    [0, ""], [1 / 8, "⅛"], [1 / 4, "¼"], [1 / 3, "⅓"], [3 / 8, "⅜"],
    [1 / 2, "½"], [5 / 8, "⅝"], [2 / 3, "⅔"], [3 / 4, "¾"], [7 / 8, "⅞"], [1, ""]
  ];
  let best = fractions[0];
  for (const option of fractions) {
    if (Math.abs(remainder - option[0]) < Math.abs(remainder - best[0])) best = option;
  }

  if (best[0] === 1) return String(whole + 1);
  if (!best[1]) return String(whole);
  return whole > 0 ? `${whole}${best[1]}` : best[1];
}

function scaleMeasuredText(text, portion) {
  return String(text).replace(
    /(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)\s*(tsp|tbsp|teaspoons?|tablespoons?|cups?|g|kg|ml|l|oz|lb)\b/gi,
    (match, quantityText, unit) => {
      const quantity = parseIngredientQuantity(quantityText);
      if (!Number.isFinite(quantity)) return match;
      return `${formatScaledQuantity(quantity * portion, unit)} ${unit}`;
    }
  );
}

function scaleIngredientLine(ingredient, portion) {
  if (Math.abs(portion - 1) < 0.0001) return ingredient;

  let scaled = String(ingredient);
  const leading = scaled.match(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)(?=\s)/);
  if (leading) {
    const quantity = parseIngredientQuantity(leading[1]);
    if (Number.isFinite(quantity)) {
      const afterQuantity = scaled.slice(leading[0].length).trimStart();
      const unitMatch = afterQuantity.match(/^(g|kg|ml|l|oz|lb|tsp|tbsp|teaspoons?|tablespoons?|cups?)\b/i);
      const unit = unitMatch ? unitMatch[1] : "";
      scaled = `${formatScaledQuantity(quantity * portion, unit)} ${afterQuantity}`;
    }
  }

  scaled = scaled.replace(
    /(about\s+)(\d+(?:\.\d+)?)\s*(g|kg|ml|l|oz|lb)\b/gi,
    (match, prefix, quantityText, unit) => `${prefix}${formatScaledQuantity(Number(quantityText) * portion, unit)} ${unit}`
  );

  if (!leading && /^(pinch|salt|pepper|oregano|cinnamon|parsley|dill|mint|basil)/i.test(scaled)) {
    scaled = `${scaled} (adjust to taste)`;
  }
  return scaled;
}

function openRecipe(recipeId, requestedPortion = 1) {
  const recipe = RECIPES.find(item => item.id === recipeId);
  if (!recipe) return;

  const portion = Number(requestedPortion) > 0 ? Number(requestedPortion) : 1;
  const nutrition = nutritionForRecipe(recipe, portion);
  const isScaled = Math.abs(portion - 1) > 0.0001;

  document.getElementById("modalCategory").textContent = recipe.category;
  document.getElementById("modalName").textContent = recipe.name;
  document.getElementById("modalDescription").textContent = recipe.description;
  document.getElementById("modalCalories").textContent = nutrition.calories;
  document.getElementById("modalProtein").textContent = `${nutrition.protein}g`;
  document.getElementById("modalCarbs").textContent = `${nutrition.carbs}g`;
  document.getElementById("modalFat").textContent = `${nutrition.fat}g`;
  document.getElementById("modalFiber").textContent = `${nutrition.fiber}g`;
  document.getElementById("modalServings").textContent = portionLabel(portion);
  document.getElementById("modalPrep").textContent = recipe.prep;
  document.getElementById("modalCook").textContent = recipe.cook;
  document.getElementById("modalScaleNotice").classList.toggle("hidden", !isScaled);
  document.getElementById("modalScaleNotice").textContent = isScaled
    ? `Measurements and macros are scaled for ${portionLabel(portion)}.`
    : "";
  document.getElementById("modalIngredients").innerHTML = recipe.ingredients
    .map(item => `<li>${scaleIngredientLine(item, portion)}</li>`)
    .join("");
  document.getElementById("modalSteps").innerHTML = recipe.steps
    .map(step => `<li>${scaleMeasuredText(step, portion)}</li>`)
    .join("");

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
  if (labels[String(portion)]) return labels[String(portion)];
  const formatted = Number(portion).toFixed(2).replace(/\.?0+$/, "");
  return `${formatted} ${Number(portion) === 1 ? "serving" : "servings"}`;
}

function selectedShakeFlavor() {
  const saved = localStorage.getItem(SHAKE_FLAVOR_STORAGE_KEY);
  return FAIRLIFE_NUTRITION[saved] ? saved : "chocolate";
}

function fairlifeNutrition() {
  return FAIRLIFE_NUTRITION[selectedShakeFlavor()];
}

function isWorkday(isoDate) {
  return WORK_DAYS.has(parseLocalDate(isoDate).getDay());
}

function routineForDay(day) {
  const shake = fairlifeNutrition();
  const workday = isWorkday(day.date);
  return [
    {
      time: workday ? "2:30 AM" : "7:00 AM",
      category: "Routine",
      name: `Black Coffee + Fairlife ${shake.label} Shake #1`,
      portion: 1,
      calories: shake.calories,
      protein: shake.protein,
      carbs: shake.carbs,
      fat: shake.fat,
      fiber: shake.fiber,
      routineType: "coffee-shake"
    },
    {
      time: workday ? "6:00 AM" : "3:00 PM",
      category: "Routine",
      name: `Fairlife ${shake.label} Shake #2`,
      portion: 1,
      calories: shake.calories,
      protein: shake.protein,
      carbs: shake.carbs,
      fat: shake.fat,
      fiber: shake.fiber,
      routineType: "shake"
    }
  ];
}

function routineItemMarkup(item, compact = false) {
  return `
    <div class="routine-item ${compact ? "compact" : ""}">
      <div class="routine-time">${item.time}</div>
      <div class="routine-main">
        <strong>${item.name}</strong>
        <span>${item.routineType === "coffee-shake" ? "Plain black coffee adds 0 calories" : "1 bottle (340 mL)"}</span>
      </div>
      <div class="routine-macros">${item.calories} cal · ${item.protein}g protein · ${item.carbs}g carbs · ${item.fat}g fat</div>
      <span class="locked-badge">Fixed</span>
    </div>
  `;
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

function calculateMealTotals(items) {
  return ["calories", "protein", "carbs", "fat", "fiber"].reduce((totals, key) => {
    const value = items.reduce((sum, item) => sum + Number(item[key] || 0), 0);
    totals[key] = key === "calories" ? Math.round(value) : roundMacro(value);
    return totals;
  }, {});
}

function getEffectiveDay(day) {
  const meals = day.meals.map((_, slotIndex) => getEffectiveMeal(day, slotIndex));
  const routine = routineForDay(day);
  return { ...day, meals, routine, totals: calculateMealTotals([...routine, ...meals]) };
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
    ? `<button class="plan-meal-name" data-open-recipe="${meal.recipeId}" data-recipe-portion="${meal.portion}">${meal.name}</button>`
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
      <p class="muted">${days.length} planned days · ${first.targetCalories.toLocaleString()}${first.targetCalories !== last.targetCalories ? `–${last.targetCalories.toLocaleString()}` : ""} calorie target · two Fairlife shakes included daily</p>
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
              <h3>${formatDate(day.date, { weekday: "long", month: "long", day: "numeric" })}${isToday ? " · Today" : ""}<span class="day-phase-badge ${day.phase}">${day.phase === "cut" ? "Cut" : "Recomp"}</span></h3>
              <p>Day ${day.day} of 90${canSwapDate(day.date) ? " · swaps unlocked" : ""}</p>
            </div>
          </div>
          <div class="day-target"><strong>${day.targetCalories.toLocaleString()} cal target</strong><span>${day.targetProtein}g protein target</span></div>
        </header>
        <div class="plan-shift-row">
          <span class="shift-badge ${isWorkday(day.date) ? "work" : "off"}">${isWorkday(day.date) ? `Work ${WORK_SHIFT}` : "Off work"}</span>
          <span>Fixed routine is included in daily totals</span>
        </div>
        <div class="plan-routine">${day.routine.map(item => routineItemMarkup(item, true)).join("")}</div>
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
    button.addEventListener("click", () => openRecipe(button.dataset.openRecipe, Number(button.dataset.recipePortion || 1)));
  });
  document.querySelectorAll("#weekDays [data-swap-date]").forEach(button => {
    button.addEventListener("click", () => openSwapDialog(button.dataset.swapDate, Number(button.dataset.swapSlot)));
  });
}

function bindShakeFlavor() {
  const select = document.getElementById("shakeFlavorSelect");
  select.value = selectedShakeFlavor();
  select.addEventListener("change", () => {
    localStorage.setItem(SHAKE_FLAVOR_STORAGE_KEY, select.value);
    refreshMealViews();
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


function maintenanceCalories() {
  const saved = Number(localStorage.getItem(MAINTENANCE_CALORIES_STORAGE_KEY));
  return Number.isFinite(saved) && saved >= 1800 && saved <= 3000
    ? saved
    : PROGRAM.maintenanceDefault;
}

function programPhaseForDate(date) {
  const cutEnd = parseLocalDate(PROGRAM.cutEndDate);
  return localDay(date) <= cutEnd ? "cut" : "recomp";
}

function phaseTargetForDate(date) {
  if (programPhaseForDate(date) === "recomp") {
    return {
      phase: "recomp",
      calories: maintenanceCalories(),
      protein: PROGRAM.recompProtein,
      label: "Maintenance + recomp"
    };
  }

  const dayIndex = clamp(daysBetween(date, parseLocalDate(PROGRAM.startDate)), 0, 61);
  const cutWeekIndex = clamp(Math.floor(dayIndex / 7), 0, PROGRAM.cutCalorieSteps.length - 1);
  return {
    phase: "cut",
    calories: PROGRAM.cutCalorieSteps[cutWeekIndex],
    protein: PROGRAM.cutProtein,
    label: "Aggressive cut"
  };
}

function applyPhasePlanTargets() {
  BASE_MEAL_PLAN.forEach((sourceDay, index) => {
    const target = phaseTargetForDate(parseLocalDate(sourceDay.date));
    const routineCalories = 300;
    const desiredMealCalories = Math.max(900, target.calories - routineCalories);
    const sourceMealCalories = sourceDay.meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
    const scale = sourceMealCalories > 0 ? desiredMealCalories / sourceMealCalories : 1;
    const scaledMeals = sourceDay.meals.map(meal => ({
      ...meal,
      portion: Math.round(Number(meal.portion || 1) * scale * 1000) / 1000,
      calories: Math.round(Number(meal.calories || 0) * scale),
      protein: roundMacro(Number(meal.protein || 0) * scale),
      carbs: roundMacro(Number(meal.carbs || 0) * scale),
      fat: roundMacro(Number(meal.fat || 0) * scale),
      fiber: roundMacro(Number(meal.fiber || 0) * scale)
    }));

    MEAL_PLAN[index] = {
      ...sourceDay,
      targetCalories: target.calories,
      targetProtein: target.protein,
      phase: target.phase,
      meals: scaledMeals,
      totals: calculateMealTotals(scaledMeals)
    };
  });
}

function bindMaintenanceCalories() {
  const input = document.getElementById("maintenanceCaloriesInput");
  const button = document.getElementById("saveMaintenanceCalories");
  const message = document.getElementById("maintenanceCaloriesMessage");
  input.value = maintenanceCalories();

  button.addEventListener("click", () => {
    const value = Number(input.value);
    if (!Number.isFinite(value) || value < 1800 || value > 3000) {
      message.textContent = "Choose a starting estimate from 1,800 to 3,000 calories.";
      return;
    }
    localStorage.setItem(MAINTENANCE_CALORIES_STORAGE_KEY, String(Math.round(value / 50) * 50));
    input.value = maintenanceCalories();
    message.textContent = `Recomp starting target saved at ${maintenanceCalories().toLocaleString()} calories.`;
    applyPhasePlanTargets();
    refreshMealViews();
    renderProgress();
  });
}

function renderPhaseCard(date) {
  const phase = phaseTargetForDate(date);
  const isCut = phase.phase === "cut";
  const badge = document.getElementById("phaseBadge");
  badge.textContent = isCut ? "Phase 1" : "Phase 2";
  badge.classList.toggle("cut", isCut);
  badge.classList.toggle("recomp", !isCut);
  document.getElementById("phaseTitle").textContent = phase.label;
  document.getElementById("phaseDates").textContent = isCut
    ? "July 11–September 10"
    : "September 11–October 8";
  document.getElementById("phaseGoal").textContent = isCut ? "178 → 155 lb" : "Hold 153–157 lb";
  document.getElementById("phaseProtein").textContent = `${phase.protein}g`;
  document.getElementById("phaseCalories").textContent = `${phase.calories.toLocaleString()} / day`;
  document.getElementById("phaseDescription").textContent = isCut
    ? "The requested target is 178 to 155 lb by September 10. The app treats this as an aggressive trend line, not a guaranteed result."
    : "Calories return to your maintenance estimate. The scale goal becomes stable weight while resistance training and adequate protein support recomposition.";
  document.getElementById("phaseSafetyNote").textContent = isCut
    ? "This pace is faster than standard weight-loss guidance. Prioritize recovery and speak with a clinician or registered dietitian before sustaining a large deficit."
    : "Use your 7-day weight average and gym performance to calibrate maintenance. Change calories in small steps instead of chasing day-to-day scale noise.";
}

function targetWeightForDate(date) {
  const start = parseLocalDate(PROGRAM.startDate);
  const cutEnd = parseLocalDate(PROGRAM.cutEndDate);
  if (localDay(date) >= cutEnd) return PROGRAM.goalWeight;
  const elapsed = clamp(daysBetween(date, start), 0, daysBetween(cutEnd, start));
  const cutDays = daysBetween(cutEnd, start);
  return PROGRAM.startWeight -
    ((PROGRAM.startWeight - PROGRAM.goalWeight) * elapsed / cutDays);
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
  const weekIndex = clamp(Math.floor(dayIndex / 7), 0, 12);
  const target = phaseTargetForDate(today);
  const completion = Math.round((displayDay / PROGRAM.totalDays) * 100);
  const targetCenter = targetWeightForDate(today);
  const isRecomp = target.phase === "recomp";
  const targetLow = isRecomp ? 153 : Math.max(PROGRAM.goalWeight, targetCenter - 0.5);
  const targetHigh = isRecomp ? 157 : targetCenter + 0.5;

  document.getElementById("dayLabel").textContent = `Day ${displayDay} of ${PROGRAM.totalDays}`;
  document.getElementById("weekLabel").textContent = `Week ${weekIndex + 1}`;
  document.getElementById("progressFill").style.width = `${completion}%`;
  document.getElementById("progressPercent").textContent = `${completion}% complete`;
  document.getElementById("daysRemaining").textContent = `${PROGRAM.totalDays - displayDay} days remaining`;
  document.getElementById("targetWeight").textContent = `${targetLow.toFixed(1)}–${targetHigh.toFixed(1)} lb`;
  document.getElementById("targetWeightNote").textContent = isRecomp ? "Maintenance range for recomposition" : "Aggressive goal line, not a guarantee";
  renderPhaseCard(today);
  document.getElementById("calorieTarget").textContent = target.calories.toLocaleString();
  document.getElementById("proteinTarget").textContent = `${target.protein}g protein`;
  document.getElementById("proteinTargetSmall").textContent = `${target.protein}g protein`;
  document.getElementById("groceryWeekHeading").textContent = `Week ${weekIndex + 1} grocery list`;

  const planDay = MEAL_PLAN[dayIndex];
  const effectiveDay = getEffectiveDay(planDay);
  const meals = getDailyRecipes(dayIndex);
  const routine = effectiveDay.routine;
  document.getElementById("todayShiftStatus").textContent = isWorkday(planDay.date)
    ? `Workday · shift ${WORK_SHIFT} · breakfast is scheduled after work`
    : "Off work · standard meal timing";
  document.getElementById("routineList").innerHTML = routine.map(item => routineItemMarkup(item)).join("");
  const mealMarkup = meals.map((meal, slotIndex) => {
    const nameControl = meal.recipeId
      ? `<button class="meal-name-button" data-open-recipe="${meal.recipeId}" data-recipe-portion="${meal.portion}">${meal.name}<span class="dashboard-portion">${meal.swapType === "flex" ? "weekly flex meal" : portionLabel(meal.portion)}</span></button>`
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
      openRecipe(element.dataset.openRecipe, Number(element.dataset.recipePortion || 1));
    });
  });
  document.querySelectorAll("#mealList [data-swap-date]").forEach(button => {
    button.addEventListener("click", () => openSwapDialog(button.dataset.swapDate, Number(button.dataset.swapSlot)));
  });

  const daysInWeek = MEAL_PLAN.filter(day => day.week === weekIndex + 1).length;
  const weeklyGroceries = {
    "Daily routine": [
      `Fairlife Nutrition Plan shakes – ${daysInWeek * 2} bottles`,
      "Black coffee – enough for the week"
    ],
    ...groceries
  };
  document.getElementById("groceryList").innerHTML = Object.entries(weeklyGroceries)
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

applyPhasePlanTargets();
bindMaintenanceCalories();
bindShakeFlavor();
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
