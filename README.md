# Mediterranean Cut + Recomp App — Version 7

This version adds two program phases:

## Phase 1 — Aggressive cut
- July 11 through September 10, 2026
- Requested trend: 178 lb to 155 lb
- Calories taper from 2,000 to 1,650 per day
- 180 g daily protein target
- Both 150-calorie Fairlife shakes remain included in the daily calorie total
- The target line reaches 155 lb on September 10

The requested loss rate is aggressive. The app labels it as a requested trend line, not a guaranteed or medically supervised outcome.

## Phase 2 — Maintenance and recomposition
- September 11 through October 8, 2026
- Default starting estimate: 2,200 calories per day
- Editable from the dashboard in 50-calorie steps
- 165 g daily protein target
- Goal range: approximately 153–157 lb while improving strength and body composition
- The 13-week plan automatically rescales scheduled recipe portions when the maintenance setting changes

## Existing features retained
- Two daily Fairlife Nutrition Plan shakes plus black coffee
- Friday, Saturday, Sunday, and Monday work schedule from 3:00–9:00 AM
- 50-recipe library with ingredient-based macros
- 90-day / 13-week meal schedule
- Meal swaps up to 14 days ahead
- One calorie-capped flex meal each week
- Weight tracking and actual-versus-target graph
- Offline/installable PWA support

## Deploy
1. Unzip the package.
2. Upload every file to the root of the GitHub repository.
3. Allow GitHub to replace files with matching names.
4. Commit the changes. Vercel should deploy automatically.

Weight entries, swaps, habits, shake flavor, and the maintenance-calorie setting are stored locally in the browser and do not yet synchronize across devices.


## Version 8: serving-aware recipes

- Opening a meal from the dashboard or 13-week plan now carries its scheduled serving size into the recipe.
- Ingredient quantities, embedded gram measurements, step measurements, calories, and macros scale automatically.
- Common portions display as practical fractions such as ¾, 1¼, and 1½ servings.
- Recipe-library cards still open at the base one-serving recipe.


## Version 9: meal completion checkboxes

- Every dashboard meal has its own completion checkbox.
- Completed meals turn green immediately.
- Unchecked meals remain neutral during the day.
- At 10:00 PM local time, unchecked meals turn red and are counted as missed.
- Completion is saved by date and meal slot in the browser, including offline.
- Meal swaps and serving-aware recipes continue to work normally.

The 10:00 PM daily close is used because the scheduled dinner is at 7:30 PM.


## Version 10: synchronized plan checkoffs

- The 13-week plan now displays a checkbox for each scheduled meal.
- Checking a meal on the dashboard immediately marks that same dated meal complete in the plan.
- Checking a meal in the plan updates the dashboard.
- Completed meals display green in both views.
- Unchecked meals display red in both views after the 10:00 PM local daily close.
- The same browser storage record is used, so no duplicate checkoff data is created.


## Version 11: routine checkoffs

- Black coffee, Fairlife shake #1, and Fairlife shake #2 are separate routine entries.
- Each routine item has its own checkbox on the dashboard and in the 13-week plan.
- Completion is synchronized between both views and saved by date.
- Completed routine items turn green.
- An unchecked routine item turns red two hours after its scheduled time.
- Checking it later still changes it from red to green.
- Black coffee contributes zero calories; the two shakes still contribute 300 calories and 60g protein daily.


## Version 12: status-only plan and timed dashboard alerts

- The 13-week plan no longer shows meal, coffee, or shake checkboxes.
- That tab is read-only for completion status: completed items highlight green.
- Unchecked items in the 13-week plan remain neutral instead of turning red.
- Checkoffs are made from the dashboard only.
- Dashboard meals turn red as soon as their individual scheduled time has passed.
- Checking an overdue meal immediately changes it from red to green.
- Coffee and shake dashboard checkoffs retain their existing scheduled-time behavior.


## Version 13: dynamic exact grocery lists

- Grocery lists are generated from each week's effective meals and serving sizes.
- Current meal substitutions immediately change the grocery quantities.
- Fairlife shakes are counted as two bottles per planned day and coffee as one serving per day.
- The grocery tab shows current week and next week preview cards.
- Tabs provide access to all Weeks 1–13.
- Quantified ingredients are consolidated by ingredient and measurement unit.
- Discrete items show the exact fractional requirement plus a practical “buy at least” whole-item amount.
- Flex-meal ingredients are excluded and clearly called out because the manually selected meal is unknown.
- Cooked rice/quinoa and dry pasta retain the measurement state used in each recipe to avoid inaccurate conversion assumptions.


## Version 14: dynamic grocery checkoffs

- Every grocery-list line now has a checkbox.
- Checked items highlight green and display a strike-through.
- Shopping progress is shown for the selected week.
- Checkoffs are saved separately for each week and work offline.
- Meal swaps immediately rebuild the grocery list.
- If a swap removes an ingredient, that ingredient disappears.
- If a swap adds an ingredient, the new line appears unchecked.
- If a swap changes an ingredient quantity, that line becomes unchecked because its quantity-aware identity changed.
- Ingredients and quantities that remain unchanged keep their checked state.
- A Reset this week button clears the selected week's grocery checkoffs.
