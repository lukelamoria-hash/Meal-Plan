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
