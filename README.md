# Mediterranean 90-Day Cut App — Version 4

This update adds a complete **Weeks 1–13** schedule tab.

## New in this version

- 90 dated days from July 11 through October 8, 2026
- Week selector for Weeks 1–13
- Four scheduled meals each day at 6:30 AM, 11:30 AM, 3:30 PM, and 7:00 PM
- Calories, protein, carbohydrates, fat, and fiber for each planned portion
- Daily totals and weekly averages
- Every planned meal opens its recipe
- Recipe macros recalculated from listed ingredient weights
- USDA FoodData Central reference values for generic foods
- Fixed reference-label values for packaged foods

## Important nutrition note

The numbers are calculated rather than hand-entered guesses, but packaged brands and cooking yield can still change the result. For best matching, weigh the listed edible portions and use a product whose label matches the reference serving.

## Deploy

Unzip the package, upload all files to the root of the GitHub repository, and commit. Vercel should redeploy automatically. Replace files with the same names and include the new `plan.js` file.

Protein targets in the schedule are matched to the actual calculated menus. They step from 175 g early in the plan to 140 g in Week 13 instead of displaying an unattainable 180 g target against a 1,600-calorie menu.
