const PROGRAM = {
  startDate: "2026-07-11",
  totalDays: 90,
  startWeight: 178,
  goalWeight: 155,
  weeklyTargets: [
    { calories: 2100, protein: 185 },
    { calories: 2100, protein: 185 },
    { calories: 2000, protein: 185 },
    { calories: 2000, protein: 185 },
    { calories: 1900, protein: 185 },
    { calories: 1900, protein: 185 },
    { calories: 1800, protein: 185 },
    { calories: 1800, protein: 185 },
    { calories: 1700, protein: 180 },
    { calories: 1700, protein: 180 },
    { calories: 1650, protein: 180 },
    { calories: 1650, protein: 180 },
    { calories: 1600, protein: 180 }
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

let activeRecipeFilter = "All";
let recipeSearchTerm = "";

function getRecipesByCategory(category) {
  return RECIPES.filter(recipe => recipe.category === category);
}

function getDailyRecipes(dayIndex) {
  const breakfasts = getRecipesByCategory("Breakfast");
  const lunches = getRecipesByCategory("Lunch");
  const dinners = getRecipesByCategory("Dinner");
  const snacks = getRecipesByCategory("Snack");
  return [
    breakfasts[dayIndex % breakfasts.length],
    lunches[(dayIndex * 2 + Math.floor(dayIndex / 7)) % lunches.length],
    snacks[(dayIndex + Math.floor(dayIndex / 5)) % snacks.length],
    dinners[(dayIndex * 3 + Math.floor(dayIndex / 7)) % dinners.length]
  ];
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

  const meals = getDailyRecipes(dayIndex);
  const mealMarkup = meals.map(meal => `
    <div class="meal recipe-clickable" data-open-recipe="${meal.id}" tabindex="0" role="button" aria-label="Open ${meal.name} recipe">
      <div class="meal-type">${meal.category}</div>
      <button class="meal-name-button" data-open-recipe="${meal.id}">${meal.name}</button>
      <div class="meal-macros">${meal.calories} cal · ${meal.protein}g protein</div>
    </div>
  `).join("");

  document.getElementById("mealList").innerHTML = mealMarkup;
  document.querySelectorAll("#mealList [data-open-recipe]").forEach(element => {
    element.addEventListener("click", event => {
      event.stopPropagation();
      openRecipe(element.dataset.openRecipe);
    });
    if (element.classList.contains("meal")) {
      element.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") openRecipe(element.dataset.openRecipe);
      });
    }
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
  if (["dashboard", "progress", "meals", "groceries"].includes(requestedTab)) {
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
