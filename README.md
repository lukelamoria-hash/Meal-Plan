# Mediterranean 90-Day Cut App — Version 5

This update adds controlled meal substitutions and a weekly cheat/flex meal.

## New features

- Swap any scheduled meal from **today through 14 days ahead**
- Past meals and dates beyond the 14-day window are locked
- Regular swaps stay in the same category (breakfast, lunch, dinner, or snack)
- Alternatives used in the selected week appear first
- Choose ¾, 1, 1¼, or 1½ servings
- Swapped recipe nutrition is recalculated from the recipe's ingredient-based macros
- Daily and weekly totals update immediately
- One weekly cheat/flex meal card for every week
- Weekly calorie caps: 750, 750, 700, 700, 650, 650, 600, 600, 550, 550, 500, 500, and 500 calories
- A flex meal can replace any unlocked scheduled meal once per week
- The app requires the actual calories, protein, carbs, fat, and fiber from a label before saving a flex meal
- Restore the originally scheduled meal while the date remains in the editable window
- All swaps are saved locally and work offline

## Deploy

1. Unzip the package.
2. Upload every file to the root of the GitHub repository.
3. Allow GitHub to replace files with matching names.
4. Commit the changes.
5. Vercel should redeploy automatically.

No build command or environment variables are required.

## Storage note

Meal swaps, weigh-ins, and habits are stored in that browser's `localStorage`. They do not yet sync between devices.
