const RECIPES = [
  {
    "id": "apple-cinnamon-protein-oats",
    "category": "Breakfast",
    "name": "Apple Cinnamon Protein Oats",
    "description": "Creamy oats with apple, cinnamon, Greek yogurt, and protein powder.",
    "servings": 1,
    "calories": 483,
    "protein": 39.1,
    "carbs": 56.4,
    "fat": 12.1,
    "fiber": 9.0,
    "prep": "5 min",
    "cook": "8 min",
    "ingredients": [
      "50 g old-fashioned oats",
      "180 ml unsweetened almond milk",
      "100 g diced apple",
      "25 g vanilla protein powder",
      "100 g plain nonfat Greek yogurt",
      "8 g chopped walnuts",
      "1/2 tsp cinnamon",
      "Pinch of salt"
    ],
    "steps": [
      "Add oats, almond milk, apple, cinnamon, and salt to a small saucepan.",
      "Cook over medium heat for 5\u20137 minutes, stirring often, until thick and tender.",
      "Remove from heat and let cool for 1 minute so the protein powder does not clump.",
      "Stir in protein powder and Greek yogurt until smooth.",
      "Top with walnuts and a little extra cinnamon."
    ],
    "tags": [
      "high protein",
      "oats"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "spinach-feta-egg-pita",
    "category": "Breakfast",
    "name": "Spinach Feta Egg Pita",
    "description": "A warm whole-wheat pita filled with eggs, spinach, tomato, and feta.",
    "servings": 1,
    "calories": 510,
    "protein": 38.0,
    "carbs": 44.1,
    "fat": 21.0,
    "fiber": 7.1,
    "prep": "8 min",
    "cook": "10 min",
    "ingredients": [
      "1 whole-wheat pita, about 65 g",
      "2 large eggs",
      "120 g liquid egg whites",
      "60 g baby spinach",
      "80 g diced tomato",
      "25 g crumbled feta",
      "1 tsp olive oil",
      "1/4 tsp oregano",
      "Black pepper"
    ],
    "steps": [
      "Warm the pita in a dry skillet or toaster until flexible.",
      "Heat olive oil in a nonstick skillet over medium heat.",
      "Add spinach and tomato; cook 2 minutes until the spinach wilts.",
      "Pour in eggs and egg whites, season with oregano and pepper, and scramble until fully set.",
      "Fill the pita with the egg mixture and feta. Serve immediately."
    ],
    "tags": [
      "pita",
      "eggs"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "greek-yogurt-granola-bowl",
    "category": "Breakfast",
    "name": "Greek Yogurt Granola Bowl",
    "description": "Greek yogurt with banana, grapes, granola, almonds, and honey.",
    "servings": 1,
    "calories": 548,
    "protein": 38.3,
    "carbs": 75.4,
    "fat": 12.8,
    "fiber": 7.0,
    "prep": "5 min",
    "cook": "0 min",
    "ingredients": [
      "300 g plain nonfat Greek yogurt",
      "80 g sliced banana",
      "70 g halved grapes",
      "35 g lower-sugar granola",
      "12 g sliced almonds",
      "8 g honey",
      "Pinch of cinnamon"
    ],
    "steps": [
      "Spoon Greek yogurt into a bowl.",
      "Arrange banana and grapes over the yogurt.",
      "Sprinkle with granola, almonds, and cinnamon.",
      "Drizzle with honey just before eating to keep the granola crisp."
    ],
    "tags": [
      "no cook",
      "yogurt"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "mediterranean-egg-scramble",
    "category": "Breakfast",
    "name": "Mediterranean Egg Scramble",
    "description": "Eggs and egg whites scrambled with peppers, tomatoes, spinach, olives, and feta.",
    "servings": 1,
    "calories": 490,
    "protein": 40.4,
    "carbs": 29.4,
    "fat": 23.5,
    "fiber": 6.5,
    "prep": "8 min",
    "cook": "10 min",
    "ingredients": [
      "2 large eggs",
      "150 g liquid egg whites",
      "75 g diced bell pepper",
      "70 g diced tomato",
      "50 g baby spinach",
      "15 g sliced olives",
      "25 g feta",
      "1 tsp olive oil",
      "1 slice whole-grain toast",
      "Oregano and black pepper"
    ],
    "steps": [
      "Toast the bread.",
      "Heat olive oil in a skillet over medium heat.",
      "Cook bell pepper for 3 minutes, then add tomato and spinach.",
      "Add eggs and egg whites; season with oregano and pepper.",
      "Scramble until just set, then fold in olives and feta. Serve with toast."
    ],
    "tags": [
      "eggs",
      "vegetables"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "smoked-salmon-avocado-toast",
    "category": "Breakfast",
    "name": "Smoked Salmon Avocado Toast",
    "description": "Whole-grain toast with avocado, smoked salmon, cucumber, egg, and lemon.",
    "servings": 1,
    "calories": 474,
    "protein": 33.5,
    "carbs": 40.9,
    "fat": 20.7,
    "fiber": 9.9,
    "prep": "8 min",
    "cook": "7 min",
    "ingredients": [
      "2 slices whole-grain bread, about 80 g",
      "60 g avocado",
      "85 g smoked salmon",
      "1 large egg",
      "60 g sliced cucumber",
      "1 tsp lemon juice",
      "1 tsp capers",
      "Black pepper and dill"
    ],
    "steps": [
      "Bring a small pot of water to a gentle boil and cook the egg for 7 minutes.",
      "Toast the bread until crisp.",
      "Mash avocado with lemon juice and black pepper, then spread over toast.",
      "Top with cucumber, smoked salmon, capers, and dill.",
      "Peel and halve the egg and serve alongside or on top."
    ],
    "tags": [
      "salmon",
      "toast"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "banana-walnut-protein-oats",
    "category": "Breakfast",
    "name": "Banana Walnut Protein Oats",
    "description": "Warm banana oats with protein powder, walnuts, and cinnamon.",
    "servings": 1,
    "calories": 554,
    "protein": 37.3,
    "carbs": 74.9,
    "fat": 13.6,
    "fiber": 11.8,
    "prep": "5 min",
    "cook": "7 min",
    "ingredients": [
      "50 g old-fashioned oats",
      "200 ml skim milk",
      "100 g mashed banana",
      "25 g vanilla protein powder",
      "10 g walnuts",
      "8 g chia seeds",
      "1/2 tsp cinnamon",
      "Pinch of salt"
    ],
    "steps": [
      "Combine oats, milk, half the banana, cinnamon, and salt in a saucepan.",
      "Cook over medium heat for 5\u20136 minutes, stirring until creamy.",
      "Remove from heat and rest for 1 minute.",
      "Stir in protein powder and chia seeds.",
      "Top with remaining banana and walnuts."
    ],
    "tags": [
      "oats",
      "banana"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "tomato-feta-breakfast-wrap",
    "category": "Breakfast",
    "name": "Tomato Feta Breakfast Wrap",
    "description": "A high-protein whole-wheat wrap with egg whites, turkey, tomato, spinach, and feta.",
    "servings": 1,
    "calories": 477,
    "protein": 39.1,
    "carbs": 43.2,
    "fat": 16.4,
    "fiber": 6.1,
    "prep": "8 min",
    "cook": "9 min",
    "ingredients": [
      "1 whole-wheat tortilla, about 65 g",
      "180 g liquid egg whites",
      "50 g sliced roasted turkey breast",
      "80 g diced tomato",
      "50 g spinach",
      "25 g feta",
      "1 tsp olive oil",
      "Paprika and black pepper"
    ],
    "steps": [
      "Heat olive oil in a skillet over medium heat.",
      "Cook tomato and spinach for 2 minutes.",
      "Add egg whites and season with paprika and pepper; scramble until set.",
      "Warm the tortilla for 15 seconds so it folds easily.",
      "Layer turkey, eggs, and feta in the tortilla, fold tightly, and toast seam-side down for 1 minute."
    ],
    "tags": [
      "wrap",
      "egg whites"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "mushroom-spinach-omelet",
    "category": "Breakfast",
    "name": "Mushroom Spinach Omelet",
    "description": "A fluffy omelet with mushrooms, spinach, goat cheese, and toast.",
    "servings": 1,
    "calories": 486,
    "protein": 44.1,
    "carbs": 23.8,
    "fat": 24.0,
    "fiber": 5.0,
    "prep": "7 min",
    "cook": "12 min",
    "ingredients": [
      "2 large eggs",
      "150 g liquid egg whites",
      "100 g sliced mushrooms",
      "60 g baby spinach",
      "25 g goat cheese",
      "1 tsp olive oil",
      "1 slice whole-grain toast",
      "Thyme, salt, and black pepper"
    ],
    "steps": [
      "Toast the bread.",
      "Heat olive oil in a nonstick skillet and cook mushrooms with thyme for 5 minutes.",
      "Add spinach and cook until wilted; transfer vegetables to a plate.",
      "Pour eggs and egg whites into the skillet and cook over medium-low heat until nearly set.",
      "Add vegetables and goat cheese to one half, fold, and cook 1 minute more."
    ],
    "tags": [
      "omelet",
      "vegetarian"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "orange-pistachio-yogurt-bowl",
    "category": "Breakfast",
    "name": "Orange Pistachio Yogurt Bowl",
    "description": "Greek yogurt with orange, pistachios, oats, dates, and cinnamon.",
    "servings": 1,
    "calories": 488,
    "protein": 38.9,
    "carbs": 66.1,
    "fat": 9.9,
    "fiber": 8.7,
    "prep": "6 min",
    "cook": "0 min",
    "ingredients": [
      "300 g plain nonfat Greek yogurt",
      "140 g orange segments",
      "25 g toasted oats",
      "15 g pistachios",
      "15 g chopped dates",
      "8 g honey",
      "Cinnamon"
    ],
    "steps": [
      "Add yogurt to a bowl.",
      "Top with orange segments, toasted oats, pistachios, and dates.",
      "Drizzle with honey and finish with cinnamon.",
      "Eat immediately or pack the toppings separately for meal prep."
    ],
    "tags": [
      "no cook",
      "citrus"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "egg-white-turkey-pita",
    "category": "Breakfast",
    "name": "Egg White Turkey Pita",
    "description": "Egg whites, turkey, peppers, and tzatziki tucked into a warm pita.",
    "servings": 1,
    "calories": 453,
    "protein": 43.2,
    "carbs": 47.7,
    "fat": 10.5,
    "fiber": 7.4,
    "prep": "8 min",
    "cook": "10 min",
    "ingredients": [
      "1 whole-wheat pita, about 65 g",
      "200 g liquid egg whites",
      "70 g sliced turkey breast",
      "70 g diced bell pepper",
      "40 g spinach",
      "35 g tzatziki",
      "1 tsp olive oil",
      "Garlic powder and black pepper"
    ],
    "steps": [
      "Warm the pita.",
      "Heat olive oil in a skillet and cook bell pepper for 3 minutes.",
      "Add spinach, then pour in egg whites and season with garlic powder and pepper.",
      "Scramble until fully set, then fold in turkey to warm it.",
      "Fill the pita and spoon tzatziki over the filling."
    ],
    "tags": [
      "pita",
      "high protein"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "peach-cinnamon-overnight-oats",
    "category": "Breakfast",
    "name": "Peach Cinnamon Overnight Oats",
    "description": "Chilled oats with peaches, Greek yogurt, chia, and vanilla protein.",
    "servings": 1,
    "calories": 518,
    "protein": 48.4,
    "carbs": 60.2,
    "fat": 9.6,
    "fiber": 11.2,
    "prep": "8 min",
    "cook": "0 min",
    "ingredients": [
      "50 g old-fashioned oats",
      "180 g plain nonfat Greek yogurt",
      "120 ml unsweetened almond milk",
      "120 g diced peaches",
      "25 g vanilla protein powder",
      "10 g chia seeds",
      "1/2 tsp cinnamon",
      "1/2 tsp vanilla extract"
    ],
    "steps": [
      "Add oats, yogurt, almond milk, protein powder, chia, cinnamon, and vanilla to a jar.",
      "Stir thoroughly until no dry protein powder remains.",
      "Fold in half the peaches.",
      "Cover and refrigerate at least 6 hours.",
      "Top with remaining peaches before serving."
    ],
    "tags": [
      "meal prep",
      "oats"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "savory-oats-egg-spinach",
    "category": "Breakfast",
    "name": "Savory Oats with Egg and Spinach",
    "description": "Savory oats cooked with spinach, egg whites, tomato, Parmesan, and a soft egg.",
    "servings": 1,
    "calories": 469,
    "protein": 35.4,
    "carbs": 42.0,
    "fat": 17.7,
    "fiber": 7.3,
    "prep": "7 min",
    "cook": "12 min",
    "ingredients": [
      "50 g old-fashioned oats",
      "250 ml low-sodium chicken broth",
      "120 g liquid egg whites",
      "1 large egg",
      "60 g spinach",
      "80 g diced tomato",
      "15 g grated Parmesan",
      "1 tsp olive oil",
      "Black pepper and red pepper flakes"
    ],
    "steps": [
      "Cook oats in broth over medium heat for 5 minutes.",
      "Stir in spinach and tomato.",
      "Slowly pour in egg whites while stirring and cook until thick and fully set.",
      "Meanwhile, fry or poach the whole egg to your preferred doneness.",
      "Spoon oats into a bowl, top with Parmesan, egg, pepper, and red pepper flakes."
    ],
    "tags": [
      "savory",
      "oats"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "greek-breakfast-plate",
    "category": "Breakfast",
    "name": "Greek Breakfast Plate",
    "description": "Eggs, Greek yogurt, cucumber, tomato, olives, feta, and whole-grain toast.",
    "servings": 1,
    "calories": 486,
    "protein": 38.2,
    "carbs": 32.1,
    "fat": 23.6,
    "fiber": 4.7,
    "prep": "10 min",
    "cook": "8 min",
    "ingredients": [
      "2 large eggs",
      "150 g plain nonfat Greek yogurt",
      "1 slice whole-grain toast",
      "100 g cucumber",
      "100 g tomato",
      "25 g feta",
      "15 g olives",
      "1 tsp olive oil",
      "Oregano and black pepper"
    ],
    "steps": [
      "Cook eggs by boiling, poaching, or scrambling them.",
      "Toast the bread.",
      "Slice cucumber and tomato and place on a plate.",
      "Add yogurt, feta, olives, and eggs.",
      "Drizzle vegetables with olive oil and season everything with oregano and pepper."
    ],
    "tags": [
      "plate",
      "eggs"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "pineapple-almond-yogurt-bowl",
    "category": "Breakfast",
    "name": "Pineapple Almond Yogurt Bowl",
    "description": "Greek yogurt with pineapple, banana, almonds, oats, and protein powder.",
    "servings": 1,
    "calories": 500,
    "protein": 48.4,
    "carbs": 60.2,
    "fat": 9.3,
    "fiber": 7.2,
    "prep": "6 min",
    "cook": "0 min",
    "ingredients": [
      "250 g plain nonfat Greek yogurt",
      "20 g vanilla protein powder",
      "130 g pineapple chunks",
      "70 g banana",
      "20 g toasted oats",
      "12 g sliced almonds",
      "Cinnamon"
    ],
    "steps": [
      "Whisk protein powder into Greek yogurt until completely smooth.",
      "Spoon into a bowl.",
      "Top with pineapple, banana, oats, almonds, and cinnamon.",
      "Serve cold."
    ],
    "tags": [
      "no cook",
      "fruit"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "sweet-potato-egg-hash",
    "category": "Breakfast",
    "name": "Sweet Potato Egg Hash",
    "description": "Roasted sweet potato, peppers, spinach, turkey, eggs, and feta.",
    "servings": 1,
    "calories": 557,
    "protein": 48.7,
    "carbs": 44.5,
    "fat": 19.9,
    "fiber": 8.0,
    "prep": "10 min",
    "cook": "20 min",
    "ingredients": [
      "180 g diced sweet potato",
      "2 large eggs",
      "100 g liquid egg whites",
      "60 g diced turkey breast",
      "70 g bell pepper",
      "50 g spinach",
      "20 g feta",
      "1 tsp olive oil",
      "Smoked paprika, garlic powder, and pepper"
    ],
    "steps": [
      "Microwave diced sweet potato for 4 minutes to soften.",
      "Heat olive oil in a skillet and cook sweet potato and pepper for 7\u20138 minutes until browned.",
      "Add turkey and spinach and cook 2 minutes.",
      "Make wells in the hash, add eggs and egg whites, cover, and cook until set.",
      "Finish with feta, paprika, garlic powder, and pepper."
    ],
    "tags": [
      "sweet potato",
      "skillet"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "lemon-garlic-chicken-bowl",
    "category": "Lunch",
    "name": "Lemon Garlic Chicken Bowl",
    "description": "Lemon-oregano chicken with rice, broccoli, tomato, cucumber, and yogurt sauce.",
    "servings": 1,
    "calories": 631,
    "protein": 55.9,
    "carbs": 67.7,
    "fat": 15.2,
    "fiber": 6.0,
    "prep": "12 min",
    "cook": "20 min",
    "ingredients": [
      "180 g raw chicken breast",
      "170 g cooked jasmine rice",
      "150 g broccoli florets",
      "80 g cucumber",
      "80 g tomato",
      "50 g plain nonfat Greek yogurt",
      "2 tsp olive oil",
      "1 tbsp lemon juice",
      "1 garlic clove, minced",
      "Oregano, salt, and pepper"
    ],
    "steps": [
      "Mix chicken with 1 teaspoon olive oil, lemon juice, garlic, oregano, salt, and pepper.",
      "Cook chicken in a skillet over medium-high heat for 5\u20137 minutes per side, until it reaches 165\u00b0F.",
      "Steam or roast broccoli until tender-crisp.",
      "Stir yogurt with a squeeze of lemon and pepper.",
      "Layer rice, broccoli, cucumber, tomato, and sliced chicken in a bowl; finish with yogurt sauce and remaining olive oil."
    ],
    "tags": [
      "chicken",
      "bowl"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "chicken-shawarma-pita",
    "category": "Lunch",
    "name": "Chicken Shawarma Pita",
    "description": "Spiced chicken, tomato, cucumber, greens, and tzatziki in whole-wheat pita.",
    "servings": 1,
    "calories": 544,
    "protein": 50.2,
    "carbs": 45.3,
    "fat": 18.8,
    "fiber": 7.3,
    "prep": "15 min",
    "cook": "16 min",
    "ingredients": [
      "180 g raw chicken breast, sliced",
      "1 whole-wheat pita, about 65 g",
      "80 g tomato",
      "80 g cucumber",
      "40 g romaine",
      "45 g tzatziki",
      "2 tsp olive oil",
      "1/2 tsp cumin",
      "1/2 tsp paprika",
      "1/4 tsp turmeric",
      "Garlic powder, salt, and pepper"
    ],
    "steps": [
      "Toss chicken with olive oil, cumin, paprika, turmeric, garlic powder, salt, and pepper.",
      "Cook in a hot skillet for 8\u201310 minutes, turning until browned and 165\u00b0F inside.",
      "Warm the pita and slice the vegetables.",
      "Open the pita and add romaine, tomato, cucumber, and chicken.",
      "Spoon in tzatziki and serve."
    ],
    "tags": [
      "pita",
      "chicken"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "turkey-kofta-rice-bowl",
    "category": "Lunch",
    "name": "Turkey Kofta Rice Bowl",
    "description": "Turkey kofta patties with rice, cucumber-tomato salad, feta, and yogurt sauce.",
    "servings": 1,
    "calories": 720,
    "protein": 54.3,
    "carbs": 52.5,
    "fat": 29.3,
    "fiber": 2.2,
    "prep": "15 min",
    "cook": "18 min",
    "ingredients": [
      "180 g lean ground turkey",
      "170 g cooked basmati rice",
      "90 g cucumber",
      "90 g tomato",
      "25 g feta",
      "50 g plain nonfat Greek yogurt",
      "2 tsp olive oil",
      "1 tbsp chopped parsley",
      "1/2 tsp cumin",
      "1/2 tsp coriander",
      "Garlic powder, salt, and pepper"
    ],
    "steps": [
      "Mix turkey with parsley, cumin, coriander, garlic powder, salt, and pepper.",
      "Shape into 4 small oval patties.",
      "Cook in a lightly oiled skillet for 4\u20135 minutes per side, until 165\u00b0F inside.",
      "Chop cucumber and tomato and toss with 1 teaspoon olive oil.",
      "Serve kofta over rice with salad, feta, and yogurt."
    ],
    "tags": [
      "turkey",
      "bowl"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "greek-chicken-salad-pita",
    "category": "Lunch",
    "name": "Greek Chicken Salad Pita",
    "description": "Grilled chicken, crunchy Greek salad, feta, and yogurt dressing in a pita.",
    "servings": 1,
    "calories": 571,
    "protein": 52.1,
    "carbs": 52.2,
    "fat": 17.9,
    "fiber": 8.8,
    "prep": "12 min",
    "cook": "15 min",
    "ingredients": [
      "170 g raw chicken breast",
      "1 whole-wheat pita, about 65 g",
      "70 g romaine",
      "80 g cucumber",
      "80 g tomato",
      "40 g bell pepper",
      "20 g red onion",
      "25 g feta",
      "40 g yogurt dressing",
      "1 tsp olive oil",
      "Oregano, salt, and pepper"
    ],
    "steps": [
      "Season chicken with oregano, salt, and pepper.",
      "Cook in a skillet with olive oil for 5\u20137 minutes per side, until 165\u00b0F; rest and slice.",
      "Chop romaine, cucumber, tomato, pepper, and onion.",
      "Toss vegetables with yogurt dressing and feta.",
      "Stuff the pita with salad and sliced chicken."
    ],
    "tags": [
      "pita",
      "salad"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "salmon-tzatziki-bowl",
    "category": "Lunch",
    "name": "Salmon Tzatziki Bowl",
    "description": "Roasted salmon with quinoa, cucumber, tomato, spinach, and tzatziki.",
    "servings": 1,
    "calories": 674,
    "protein": 46.3,
    "carbs": 45.1,
    "fat": 34.5,
    "fiber": 7.5,
    "prep": "12 min",
    "cook": "18 min",
    "ingredients": [
      "170 g salmon fillet",
      "160 g cooked quinoa",
      "80 g cucumber",
      "80 g tomato",
      "60 g spinach",
      "45 g tzatziki",
      "1 tsp olive oil",
      "1 tbsp lemon juice",
      "Dill, garlic powder, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 425\u00b0F.",
      "Season salmon with lemon, dill, garlic powder, salt, and pepper.",
      "Bake for 10\u201313 minutes, until it flakes and reaches about 145\u00b0F.",
      "Warm quinoa and lightly wilt spinach in a skillet or microwave.",
      "Assemble quinoa, spinach, cucumber, tomato, salmon, tzatziki, and olive oil."
    ],
    "tags": [
      "salmon",
      "quinoa"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "shrimp-quinoa-bowl",
    "category": "Lunch",
    "name": "Shrimp Quinoa Bowl",
    "description": "Garlic shrimp with quinoa, peppers, spinach, cucumber, and lemon feta dressing.",
    "servings": 1,
    "calories": 578,
    "protein": 54.5,
    "carbs": 49.6,
    "fat": 19.2,
    "fiber": 8.3,
    "prep": "12 min",
    "cook": "14 min",
    "ingredients": [
      "200 g peeled shrimp",
      "170 g cooked quinoa",
      "80 g bell pepper",
      "60 g spinach",
      "80 g cucumber",
      "25 g feta",
      "2 tsp olive oil",
      "1 tbsp lemon juice",
      "1 garlic clove, minced",
      "Paprika, salt, and pepper"
    ],
    "steps": [
      "Pat shrimp dry and season with paprika, salt, and pepper.",
      "Heat 1 teaspoon olive oil in a skillet and cook shrimp for 2 minutes per side.",
      "Remove shrimp, add pepper and spinach, and cook 3 minutes.",
      "Whisk remaining olive oil with lemon and garlic.",
      "Combine quinoa, vegetables, cucumber, shrimp, feta, and dressing."
    ],
    "tags": [
      "shrimp",
      "quinoa"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "mediterranean-turkey-meatballs",
    "category": "Lunch",
    "name": "Mediterranean Turkey Meatballs",
    "description": "Herbed turkey meatballs with rice, green beans, tomato sauce, and feta.",
    "servings": 1,
    "calories": 776,
    "protein": 54.3,
    "carbs": 76.9,
    "fat": 25.3,
    "fiber": 7.7,
    "prep": "15 min",
    "cook": "25 min",
    "ingredients": [
      "190 g lean ground turkey",
      "160 g cooked rice",
      "150 g green beans",
      "120 g crushed tomatoes",
      "20 g feta",
      "15 g whole-wheat breadcrumbs",
      "1 tsp olive oil",
      "1 garlic clove, minced",
      "Parsley, oregano, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 425\u00b0F and line a pan.",
      "Mix turkey, breadcrumbs, garlic, parsley, oregano, salt, and pepper.",
      "Shape into 6 meatballs and bake for 15\u201318 minutes, until 165\u00b0F.",
      "Warm crushed tomatoes in a small pan and steam green beans.",
      "Serve meatballs with rice, sauce, green beans, feta, and olive oil."
    ],
    "tags": [
      "turkey",
      "meal prep"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "chicken-souvlaki-pita",
    "category": "Lunch",
    "name": "Chicken Souvlaki Pita",
    "description": "Lemon-herb chicken, tomato, cucumber, onion, and tzatziki in pita.",
    "servings": 1,
    "calories": 549,
    "protein": 49.9,
    "carbs": 46.9,
    "fat": 18.7,
    "fiber": 6.8,
    "prep": "15 min",
    "cook": "15 min",
    "ingredients": [
      "180 g raw chicken breast, cubed",
      "1 whole-wheat pita, about 65 g",
      "80 g tomato",
      "80 g cucumber",
      "20 g red onion",
      "45 g tzatziki",
      "2 tsp olive oil",
      "1 tbsp lemon juice",
      "Oregano, garlic powder, salt, and pepper"
    ],
    "steps": [
      "Toss chicken with olive oil, lemon, oregano, garlic powder, salt, and pepper.",
      "Thread onto skewers or cook directly in a skillet.",
      "Cook over medium-high heat for 8\u201310 minutes, turning until browned and 165\u00b0F.",
      "Warm pita and chop vegetables.",
      "Fill pita with chicken, vegetables, and tzatziki."
    ],
    "tags": [
      "pita",
      "chicken"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "cod-chickpea-salad-bowl",
    "category": "Lunch",
    "name": "Cod Chickpea Salad Bowl",
    "description": "Lemon cod over chickpeas, greens, cucumber, tomato, and feta.",
    "servings": 1,
    "calories": 521,
    "protein": 47.6,
    "carbs": 40.5,
    "fat": 19.6,
    "fiber": 11.3,
    "prep": "12 min",
    "cook": "14 min",
    "ingredients": [
      "180 g cod fillet",
      "130 g drained chickpeas",
      "70 g mixed greens",
      "90 g cucumber",
      "90 g tomato",
      "25 g feta",
      "2 tsp olive oil",
      "1 tbsp lemon juice",
      "Paprika, oregano, salt, and pepper"
    ],
    "steps": [
      "Season cod with paprika, oregano, salt, and pepper.",
      "Heat 1 teaspoon olive oil in a skillet and cook cod 4\u20135 minutes per side, until opaque and about 145\u00b0F.",
      "Rinse and drain chickpeas.",
      "Toss greens, cucumber, tomato, chickpeas, feta, remaining olive oil, and lemon.",
      "Place cod over the salad."
    ],
    "tags": [
      "cod",
      "chickpeas"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "roasted-pepper-chicken-pasta",
    "category": "Lunch",
    "name": "Roasted Red Pepper Chicken Pasta",
    "description": "Whole-wheat pasta with chicken, roasted pepper sauce, spinach, and Parmesan.",
    "servings": 1,
    "calories": 696,
    "protein": 60.8,
    "carbs": 69.5,
    "fat": 20.8,
    "fiber": 11.6,
    "prep": "12 min",
    "cook": "22 min",
    "ingredients": [
      "180 g raw chicken breast",
      "75 g dry whole-wheat pasta",
      "120 g jarred roasted red peppers, drained",
      "80 g crushed tomatoes",
      "50 g spinach",
      "15 g Parmesan",
      "2 tsp olive oil",
      "1 garlic clove",
      "Basil, salt, and pepper"
    ],
    "steps": [
      "Boil pasta until al dente; reserve 60 ml pasta water.",
      "Season and cook chicken in 1 teaspoon olive oil until 165\u00b0F, then slice.",
      "Blend roasted peppers, crushed tomatoes, garlic, basil, salt, and pepper.",
      "Simmer sauce in the skillet, add spinach, then stir in pasta and enough pasta water to loosen.",
      "Top with chicken, Parmesan, and remaining olive oil."
    ],
    "tags": [
      "pasta",
      "chicken"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "herb-turkey-stuffed-peppers",
    "category": "Lunch",
    "name": "Herb Turkey Stuffed Peppers",
    "description": "Bell pepper halves filled with turkey, rice, tomato, spinach, and feta.",
    "servings": 1,
    "calories": 720,
    "protein": 51.3,
    "carbs": 65.3,
    "fat": 25.3,
    "fiber": 8.6,
    "prep": "15 min",
    "cook": "30 min",
    "ingredients": [
      "2 bell pepper halves, about 220 g",
      "180 g lean ground turkey",
      "140 g cooked rice",
      "120 g crushed tomatoes",
      "50 g spinach",
      "25 g feta",
      "1 tsp olive oil",
      "1 garlic clove",
      "Oregano, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 400\u00b0F.",
      "Place pepper halves in a baking dish with a splash of water and bake 10 minutes.",
      "Cook turkey in olive oil with garlic, oregano, salt, and pepper until browned and 165\u00b0F.",
      "Stir in rice, tomatoes, and spinach.",
      "Fill peppers, top with feta, and bake 12\u201315 minutes more."
    ],
    "tags": [
      "turkey",
      "peppers"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "steak-greek-salad",
    "category": "Lunch",
    "name": "Steak Greek Salad",
    "description": "Lean sirloin over romaine, tomatoes, cucumber, peppers, potatoes, olives, and feta.",
    "servings": 1,
    "calories": 695,
    "protein": 47.7,
    "carbs": 46.3,
    "fat": 35.3,
    "fiber": 8.5,
    "prep": "15 min",
    "cook": "20 min",
    "ingredients": [
      "170 g lean sirloin steak",
      "180 g baby potatoes",
      "80 g romaine",
      "90 g tomato",
      "90 g cucumber",
      "60 g bell pepper",
      "20 g feta",
      "15 g olives",
      "2 tsp olive oil",
      "1 tbsp red wine vinegar",
      "Oregano, salt, and pepper"
    ],
    "steps": [
      "Halve potatoes and roast at 425\u00b0F with 1 teaspoon olive oil for about 20 minutes.",
      "Season steak with salt, pepper, and oregano.",
      "Sear in a hot skillet to preferred doneness, then rest 5 minutes and slice.",
      "Toss romaine, tomato, cucumber, pepper, feta, olives, vinegar, and remaining olive oil.",
      "Top salad with potatoes and steak."
    ],
    "tags": [
      "beef",
      "salad"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "garlic-shrimp-pita",
    "category": "Lunch",
    "name": "Garlic Shrimp Pita",
    "description": "Garlic shrimp, crunchy salad, feta, and yogurt sauce in a whole-wheat pita.",
    "servings": 1,
    "calories": 537,
    "protein": 55.7,
    "carbs": 47.8,
    "fat": 16.0,
    "fiber": 7.5,
    "prep": "12 min",
    "cook": "10 min",
    "ingredients": [
      "200 g peeled shrimp",
      "1 whole-wheat pita, about 65 g",
      "60 g romaine",
      "80 g cucumber",
      "80 g tomato",
      "20 g feta",
      "40 g plain Greek yogurt",
      "2 tsp olive oil",
      "1 garlic clove, minced",
      "Lemon juice, paprika, salt, and pepper"
    ],
    "steps": [
      "Pat shrimp dry and season with paprika, salt, and pepper.",
      "Cook garlic in olive oil for 20 seconds, then add shrimp and cook 2 minutes per side.",
      "Stir lemon juice into the yogurt.",
      "Warm pita and chop the vegetables.",
      "Fill pita with romaine, cucumber, tomato, shrimp, feta, and yogurt sauce."
    ],
    "tags": [
      "shrimp",
      "pita"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "lemon-herb-salmon-salad",
    "category": "Lunch",
    "name": "Lemon Herb Salmon Salad",
    "description": "Salmon with greens, quinoa, cucumber, orange, almonds, and lemon dressing.",
    "servings": 1,
    "calories": 725,
    "protein": 45.6,
    "carbs": 46.6,
    "fat": 40.5,
    "fiber": 9.3,
    "prep": "12 min",
    "cook": "15 min",
    "ingredients": [
      "170 g salmon fillet",
      "120 g cooked quinoa",
      "80 g mixed greens",
      "80 g cucumber",
      "100 g orange segments",
      "12 g almonds",
      "2 tsp olive oil",
      "1 tbsp lemon juice",
      "Dill, salt, and pepper"
    ],
    "steps": [
      "Season salmon with dill, salt, pepper, and half the lemon juice.",
      "Bake at 425\u00b0F for 10\u201313 minutes or pan-sear until about 145\u00b0F.",
      "Add greens, quinoa, cucumber, orange, and almonds to a bowl.",
      "Whisk olive oil with remaining lemon juice.",
      "Flake salmon over the salad and drizzle with dressing."
    ],
    "tags": [
      "salmon",
      "salad"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "mediterranean-chicken-quinoa-bowl",
    "category": "Lunch",
    "name": "Mediterranean Chicken Quinoa Bowl",
    "description": "Chicken, quinoa, roasted vegetables, cucumber, feta, and herb yogurt.",
    "servings": 1,
    "calories": 641,
    "protein": 60.1,
    "carbs": 47.8,
    "fat": 22.9,
    "fiber": 7.6,
    "prep": "15 min",
    "cook": "22 min",
    "ingredients": [
      "180 g raw chicken breast",
      "160 g cooked quinoa",
      "90 g bell pepper",
      "80 g mushrooms",
      "80 g cucumber",
      "25 g feta",
      "50 g plain Greek yogurt",
      "2 tsp olive oil",
      "Lemon juice, oregano, garlic powder, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 425\u00b0F.",
      "Toss bell pepper and mushrooms with 1 teaspoon olive oil and roast 15 minutes.",
      "Season chicken with oregano, garlic powder, salt, and pepper; cook until 165\u00b0F and slice.",
      "Mix yogurt with lemon juice and black pepper.",
      "Layer quinoa, roasted vegetables, cucumber, chicken, feta, and yogurt sauce."
    ],
    "tags": [
      "chicken",
      "quinoa"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "herb-salmon-roasted-potatoes",
    "category": "Dinner",
    "name": "Herb Salmon with Roasted Potatoes",
    "description": "Dill-lemon salmon with roasted potatoes and asparagus.",
    "servings": 1,
    "calories": 711,
    "protein": 48.1,
    "carbs": 52.7,
    "fat": 35.0,
    "fiber": 9.1,
    "prep": "12 min",
    "cook": "28 min",
    "ingredients": [
      "190 g salmon fillet",
      "250 g baby potatoes, halved",
      "180 g asparagus",
      "2 tsp olive oil",
      "1 tbsp lemon juice",
      "1 garlic clove, minced",
      "Dill, parsley, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 425\u00b0F.",
      "Toss potatoes with 1 teaspoon olive oil, salt, and pepper; roast 15 minutes.",
      "Add asparagus to the pan with half the remaining oil.",
      "Season salmon with lemon, garlic, herbs, salt, pepper, and remaining oil; place on the pan.",
      "Roast 10\u201313 minutes more, until salmon is about 145\u00b0F and potatoes are tender."
    ],
    "tags": [
      "salmon",
      "sheet pan"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "garlic-cod-rice-green-beans",
    "category": "Dinner",
    "name": "Garlic Cod with Rice and Green Beans",
    "description": "Pan-seared cod with garlic, jasmine rice, green beans, and lemon.",
    "servings": 1,
    "calories": 559,
    "protein": 44.5,
    "carbs": 69.1,
    "fat": 11.3,
    "fiber": 5.8,
    "prep": "10 min",
    "cook": "20 min",
    "ingredients": [
      "200 g cod fillet",
      "190 g cooked jasmine rice",
      "180 g green beans",
      "2 tsp olive oil",
      "2 garlic cloves, minced",
      "1 tbsp lemon juice",
      "Paprika, parsley, salt, and pepper"
    ],
    "steps": [
      "Steam green beans until tender-crisp and warm the rice.",
      "Pat cod dry and season with paprika, salt, and pepper.",
      "Heat olive oil in a skillet over medium-high heat.",
      "Cook cod 4\u20135 minutes per side; add garlic during the final minute and cook until fish is opaque and about 145\u00b0F.",
      "Serve with rice and green beans; spoon garlic oil and lemon over everything."
    ],
    "tags": [
      "cod",
      "rice"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "mediterranean-chicken-pasta",
    "category": "Dinner",
    "name": "Mediterranean Chicken Pasta",
    "description": "Whole-wheat pasta with chicken, tomatoes, spinach, olives, feta, and herbs.",
    "servings": 1,
    "calories": 739,
    "protein": 61.9,
    "carbs": 73.9,
    "fat": 23.9,
    "fiber": 11.8,
    "prep": "12 min",
    "cook": "24 min",
    "ingredients": [
      "190 g raw chicken breast",
      "80 g dry whole-wheat pasta",
      "150 g crushed tomatoes",
      "60 g spinach",
      "15 g sliced olives",
      "25 g feta",
      "2 tsp olive oil",
      "1 garlic clove",
      "Basil, oregano, salt, and pepper"
    ],
    "steps": [
      "Boil pasta until al dente, reserving a little pasta water.",
      "Season chicken and cook in 1 teaspoon olive oil until 165\u00b0F; rest and slice.",
      "Cook garlic briefly, then add tomatoes, basil, oregano, salt, and pepper; simmer 5 minutes.",
      "Stir in spinach, olives, pasta, and enough pasta water to coat.",
      "Top with sliced chicken, feta, and remaining olive oil."
    ],
    "tags": [
      "pasta",
      "chicken"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "sheet-pan-chicken-peppers-potatoes",
    "category": "Dinner",
    "name": "Sheet-Pan Chicken, Peppers & Potatoes",
    "description": "Roasted chicken breast with peppers, onion, potatoes, lemon, and oregano.",
    "servings": 1,
    "calories": 585,
    "protein": 52.3,
    "carbs": 59.5,
    "fat": 14.9,
    "fiber": 9.1,
    "prep": "15 min",
    "cook": "30 min",
    "ingredients": [
      "200 g raw chicken breast, cubed",
      "250 g baby potatoes, quartered",
      "120 g bell peppers",
      "70 g red onion",
      "2 tsp olive oil",
      "1 tbsp lemon juice",
      "1 garlic clove",
      "Oregano, paprika, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 425\u00b0F.",
      "Microwave potatoes for 4 minutes to start cooking them.",
      "Toss potatoes, peppers, onion, and chicken with olive oil, lemon, garlic, oregano, paprika, salt, and pepper.",
      "Spread on a sheet pan in one layer.",
      "Roast 22\u201326 minutes, stirring once, until chicken reaches 165\u00b0F and potatoes are browned."
    ],
    "tags": [
      "sheet pan",
      "chicken"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "turkey-stuffed-eggplant",
    "category": "Dinner",
    "name": "Turkey Stuffed Eggplant",
    "description": "Roasted eggplant filled with turkey, tomatoes, spinach, rice, and feta.",
    "servings": 1,
    "calories": 761,
    "protein": 53.8,
    "carbs": 64.8,
    "fat": 30.4,
    "fiber": 13.1,
    "prep": "15 min",
    "cook": "35 min",
    "ingredients": [
      "1 medium eggplant, about 300 g",
      "190 g lean ground turkey",
      "120 g cooked rice",
      "130 g crushed tomatoes",
      "50 g spinach",
      "25 g feta",
      "2 tsp olive oil",
      "1 garlic clove",
      "Oregano, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 425\u00b0F. Halve eggplant and score the flesh.",
      "Brush with 1 teaspoon olive oil and roast cut-side down for 20 minutes.",
      "Cook turkey with remaining oil, garlic, oregano, salt, and pepper until 165\u00b0F.",
      "Stir in tomatoes, spinach, and rice. Scoop some eggplant flesh into the filling.",
      "Fill eggplant shells, top with feta, and bake 8\u201310 minutes."
    ],
    "tags": [
      "turkey",
      "eggplant"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "lemon-shrimp-orzo",
    "category": "Dinner",
    "name": "Lemon Shrimp Orzo",
    "description": "Shrimp and whole-wheat orzo with spinach, tomatoes, feta, and lemon.",
    "servings": 1,
    "calories": 645,
    "protein": 59.7,
    "carbs": 67.5,
    "fat": 18.2,
    "fiber": 10.0,
    "prep": "12 min",
    "cook": "20 min",
    "ingredients": [
      "210 g peeled shrimp",
      "80 g dry whole-wheat orzo",
      "100 g cherry tomatoes, halved",
      "60 g spinach",
      "25 g feta",
      "2 tsp olive oil",
      "1 garlic clove",
      "1 tbsp lemon juice",
      "Parsley, salt, and pepper"
    ],
    "steps": [
      "Boil orzo until al dente; reserve 60 ml cooking water.",
      "Season shrimp with salt and pepper.",
      "Cook garlic in 1 teaspoon olive oil, add shrimp, and cook 2 minutes per side; remove.",
      "Add tomatoes and spinach to the skillet, then stir in orzo, lemon juice, and enough cooking water to make it glossy.",
      "Return shrimp and finish with feta, parsley, and remaining olive oil."
    ],
    "tags": [
      "shrimp",
      "orzo"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "chicken-piccata-asparagus",
    "category": "Dinner",
    "name": "Chicken Piccata with Asparagus",
    "description": "Lemon-caper chicken with asparagus and roasted potatoes.",
    "servings": 1,
    "calories": 599,
    "protein": 56.7,
    "carbs": 60.9,
    "fat": 15.2,
    "fiber": 10.6,
    "prep": "15 min",
    "cook": "28 min",
    "ingredients": [
      "200 g chicken breast, sliced into cutlets",
      "230 g baby potatoes",
      "180 g asparagus",
      "15 g whole-wheat flour",
      "2 tsp olive oil",
      "120 ml low-sodium chicken broth",
      "1 tbsp lemon juice",
      "1 tbsp capers",
      "1 garlic clove",
      "Salt, pepper, and parsley"
    ],
    "steps": [
      "Heat oven to 425\u00b0F and roast halved potatoes with 1 teaspoon olive oil for 25 minutes.",
      "Season chicken and lightly dust with flour.",
      "Sear chicken in remaining oil for 3\u20134 minutes per side, until 165\u00b0F; remove.",
      "Add garlic, broth, lemon, and capers to the skillet and simmer until slightly reduced.",
      "Steam asparagus and return chicken to the sauce. Serve with potatoes and parsley."
    ],
    "tags": [
      "chicken",
      "lemon"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "greek-turkey-burger-potatoes",
    "category": "Dinner",
    "name": "Greek Turkey Burger with Potatoes",
    "description": "Feta-herb turkey burger with roasted potatoes, tomato-cucumber salad, and yogurt sauce.",
    "servings": 1,
    "calories": 809,
    "protein": 59.8,
    "carbs": 65.0,
    "fat": 31.3,
    "fiber": 10.0,
    "prep": "15 min",
    "cook": "28 min",
    "ingredients": [
      "200 g lean ground turkey",
      "25 g feta",
      "1 whole-grain sandwich thin",
      "220 g baby potatoes",
      "80 g tomato",
      "80 g cucumber",
      "40 g plain Greek yogurt",
      "2 tsp olive oil",
      "Oregano, garlic powder, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 425\u00b0F and roast potatoes with 1 teaspoon olive oil for 25 minutes.",
      "Mix turkey with feta, oregano, garlic powder, salt, and pepper; shape into a patty.",
      "Cook in a skillet 5\u20136 minutes per side, until 165\u00b0F.",
      "Mix yogurt with pepper and a squeeze of lemon if available.",
      "Serve burger on the sandwich thin with tomato-cucumber salad, yogurt sauce, and potatoes."
    ],
    "tags": [
      "turkey",
      "burger"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "baked-cod-tomato-olive",
    "category": "Dinner",
    "name": "Baked Cod with Tomato & Olive",
    "description": "Cod baked in tomato, olive, garlic, and herb sauce with quinoa.",
    "servings": 1,
    "calories": 564,
    "protein": 49.0,
    "carbs": 56.1,
    "fat": 16.6,
    "fiber": 9.9,
    "prep": "12 min",
    "cook": "24 min",
    "ingredients": [
      "210 g cod fillet",
      "170 g cooked quinoa",
      "180 g crushed tomatoes",
      "20 g sliced olives",
      "60 g bell pepper",
      "2 tsp olive oil",
      "2 garlic cloves",
      "Oregano, parsley, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 400\u00b0F.",
      "Cook bell pepper and garlic in 1 teaspoon olive oil for 3 minutes.",
      "Add crushed tomatoes, olives, oregano, salt, and pepper; simmer 5 minutes.",
      "Place cod in a baking dish, pour sauce over it, drizzle with remaining oil, and bake 12\u201315 minutes until about 145\u00b0F.",
      "Serve over quinoa with parsley."
    ],
    "tags": [
      "cod",
      "tomato"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "salmon-spinach-rice-skillet",
    "category": "Dinner",
    "name": "Salmon Spinach Rice Skillet",
    "description": "Flaked salmon with rice, spinach, tomatoes, lemon, and feta.",
    "servings": 1,
    "calories": 822,
    "protein": 49.9,
    "carbs": 63.4,
    "fat": 40.2,
    "fiber": 3.8,
    "prep": "12 min",
    "cook": "20 min",
    "ingredients": [
      "185 g salmon fillet",
      "190 g cooked rice",
      "80 g spinach",
      "100 g cherry tomatoes",
      "25 g feta",
      "2 tsp olive oil",
      "1 tbsp lemon juice",
      "1 garlic clove",
      "Dill, salt, and pepper"
    ],
    "steps": [
      "Season salmon with dill, salt, and pepper.",
      "Cook salmon in 1 teaspoon olive oil for 4\u20135 minutes per side, until about 145\u00b0F; remove and flake.",
      "Cook garlic and tomatoes in remaining oil for 3 minutes.",
      "Add spinach and rice and stir until hot.",
      "Fold in salmon, lemon juice, and feta."
    ],
    "tags": [
      "salmon",
      "skillet"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "chicken-kabobs-quinoa",
    "category": "Dinner",
    "name": "Chicken Kabobs with Quinoa",
    "description": "Lemon-herb chicken skewers with peppers, onions, quinoa, and tzatziki.",
    "servings": 1,
    "calories": 636,
    "protein": 56.1,
    "carbs": 51.8,
    "fat": 21.9,
    "fiber": 8.4,
    "prep": "18 min",
    "cook": "18 min",
    "ingredients": [
      "200 g chicken breast, cubed",
      "170 g cooked quinoa",
      "100 g bell peppers",
      "70 g red onion",
      "50 g tzatziki",
      "2 tsp olive oil",
      "1 tbsp lemon juice",
      "Oregano, garlic powder, salt, and pepper"
    ],
    "steps": [
      "Toss chicken with olive oil, lemon, oregano, garlic powder, salt, and pepper.",
      "Thread chicken, peppers, and onion onto skewers.",
      "Grill or broil for 12\u201315 minutes, turning, until chicken reaches 165\u00b0F.",
      "Warm quinoa.",
      "Serve kabobs over quinoa with tzatziki."
    ],
    "tags": [
      "chicken",
      "kabobs"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "beef-kofta-rice",
    "category": "Dinner",
    "name": "Beef Kofta with Rice",
    "description": "Lean beef kofta with rice, cucumber-tomato salad, feta, and yogurt.",
    "servings": 1,
    "calories": 710,
    "protein": 57.1,
    "carbs": 55.0,
    "fat": 24.3,
    "fiber": 2.2,
    "prep": "15 min",
    "cook": "18 min",
    "ingredients": [
      "190 g 93% lean ground beef",
      "180 g cooked basmati rice",
      "90 g cucumber",
      "90 g tomato",
      "25 g feta",
      "50 g plain nonfat Greek yogurt",
      "1 tsp olive oil",
      "1 tbsp parsley",
      "1/2 tsp cumin",
      "1/2 tsp coriander",
      "Garlic powder, salt, and pepper"
    ],
    "steps": [
      "Mix beef with parsley, cumin, coriander, garlic powder, salt, and pepper.",
      "Shape into 4 small logs.",
      "Cook in a skillet over medium-high heat for 4\u20135 minutes per side, until cooked through.",
      "Toss cucumber and tomato with olive oil.",
      "Serve kofta with rice, salad, feta, and yogurt."
    ],
    "tags": [
      "beef",
      "kofta"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "shrimp-tomato-feta-pasta",
    "category": "Dinner",
    "name": "Shrimp Tomato Feta Pasta",
    "description": "Whole-wheat pasta with shrimp, tomatoes, spinach, feta, garlic, and herbs.",
    "servings": 1,
    "calories": 693,
    "protein": 62.3,
    "carbs": 75.4,
    "fat": 19.5,
    "fiber": 11.8,
    "prep": "12 min",
    "cook": "22 min",
    "ingredients": [
      "210 g peeled shrimp",
      "80 g dry whole-wheat pasta",
      "160 g crushed tomatoes",
      "60 g spinach",
      "30 g feta",
      "2 tsp olive oil",
      "2 garlic cloves",
      "Basil, red pepper flakes, salt, and pepper"
    ],
    "steps": [
      "Boil pasta until al dente and reserve 60 ml pasta water.",
      "Season shrimp; cook in 1 teaspoon olive oil for 2 minutes per side and remove.",
      "Cook garlic briefly, then add tomatoes, basil, red pepper flakes, salt, and pepper.",
      "Stir in spinach, pasta, and enough pasta water to coat.",
      "Return shrimp and top with feta and remaining olive oil."
    ],
    "tags": [
      "shrimp",
      "pasta"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "roasted-garlic-chicken-thighs",
    "category": "Dinner",
    "name": "Roasted Garlic Chicken Thighs",
    "description": "Skinless chicken thighs with quinoa, Brussels sprouts, carrots, and lemon.",
    "servings": 1,
    "calories": 726,
    "protein": 57.4,
    "carbs": 64.1,
    "fat": 27.8,
    "fiber": 14.0,
    "prep": "15 min",
    "cook": "32 min",
    "ingredients": [
      "220 g boneless skinless chicken thighs",
      "170 g cooked quinoa",
      "150 g Brussels sprouts, halved",
      "120 g carrots",
      "2 tsp olive oil",
      "2 garlic cloves, minced",
      "1 tbsp lemon juice",
      "Thyme, paprika, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 425\u00b0F.",
      "Toss Brussels sprouts and carrots with 1 teaspoon olive oil, salt, and pepper.",
      "Season chicken with garlic, lemon, thyme, paprika, salt, pepper, and remaining oil.",
      "Arrange everything on a sheet pan and roast 25\u201330 minutes, until chicken reaches 165\u00b0F.",
      "Serve with warm quinoa and pan juices."
    ],
    "tags": [
      "chicken thighs",
      "sheet pan"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "mediterranean-turkey-meatloaf",
    "category": "Dinner",
    "name": "Mediterranean Turkey Meatloaf",
    "description": "Individual turkey meatloaf with oats, spinach, feta, tomato glaze, and potatoes.",
    "servings": 1,
    "calories": 897,
    "protein": 67.6,
    "carbs": 75.8,
    "fat": 33.8,
    "fiber": 13.5,
    "prep": "18 min",
    "cook": "35 min",
    "ingredients": [
      "220 g lean ground turkey",
      "25 g rolled oats",
      "50 g spinach, chopped",
      "25 g feta",
      "40 g egg whites",
      "50 g tomato sauce",
      "240 g baby potatoes",
      "150 g green beans",
      "2 tsp olive oil",
      "Garlic powder, oregano, salt, and pepper"
    ],
    "steps": [
      "Heat oven to 400\u00b0F.",
      "Mix turkey, oats, spinach, feta, egg whites, garlic powder, oregano, salt, and pepper.",
      "Shape into a small loaf on a lined pan and spread tomato sauce over the top.",
      "Add halved potatoes tossed with 1 teaspoon olive oil and bake 30\u201335 minutes, until meatloaf reaches 165\u00b0F.",
      "Steam green beans and serve with the meatloaf, potatoes, and remaining olive oil."
    ],
    "tags": [
      "turkey",
      "meal prep"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "greek-yogurt-apple-crunch",
    "category": "Snack",
    "name": "Greek Yogurt Apple Crunch",
    "description": "Greek yogurt with apple, almonds, oats, cinnamon, and honey.",
    "servings": 1,
    "calories": 303,
    "protein": 25.0,
    "carbs": 36.7,
    "fat": 7.7,
    "fiber": 5.1,
    "prep": "5 min",
    "cook": "0 min",
    "ingredients": [
      "200 g plain nonfat Greek yogurt",
      "100 g diced apple",
      "12 g almonds",
      "12 g toasted oats",
      "6 g honey",
      "Cinnamon"
    ],
    "steps": [
      "Add yogurt to a bowl or container.",
      "Top with apple, almonds, and oats.",
      "Drizzle with honey and sprinkle with cinnamon.",
      "Keep the crunchy toppings separate until serving if making ahead."
    ],
    "tags": [
      "no cook",
      "yogurt"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "protein-shake-orange",
    "category": "Snack",
    "name": "Protein Shake & Orange",
    "description": "A simple protein shake paired with a fresh orange.",
    "servings": 1,
    "calories": 219,
    "protein": 26.2,
    "carbs": 19.1,
    "fat": 4.2,
    "fiber": 3.6,
    "prep": "3 min",
    "cook": "0 min",
    "ingredients": [
      "30 g protein powder",
      "250 ml unsweetened almond milk",
      "1 medium orange",
      "Ice",
      "Cinnamon, optional"
    ],
    "steps": [
      "Add protein powder, almond milk, ice, and cinnamon to a blender or shaker.",
      "Blend or shake until smooth.",
      "Peel the orange.",
      "Drink the shake with the orange on the side."
    ],
    "tags": [
      "quick",
      "shake"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "hard-boiled-eggs-grapes",
    "category": "Snack",
    "name": "Hard-Boiled Eggs & Grapes",
    "description": "Two hard-boiled eggs with grapes and a small serving of pistachios.",
    "servings": 1,
    "calories": 282,
    "protein": 15.4,
    "carbs": 25.2,
    "fat": 14.2,
    "fiber": 2.1,
    "prep": "3 min",
    "cook": "10 min",
    "ingredients": [
      "2 large eggs",
      "120 g grapes",
      "10 g pistachios",
      "Pinch of salt and pepper"
    ],
    "steps": [
      "Place eggs in a small pot and cover with water.",
      "Bring to a boil, cover, remove from heat, and rest 10 minutes.",
      "Transfer eggs to ice water, then peel.",
      "Serve with grapes and pistachios; season eggs with salt and pepper."
    ],
    "tags": [
      "eggs",
      "portable"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "hummus-carrot-pita-plate",
    "category": "Snack",
    "name": "Hummus Carrot Pita Plate",
    "description": "Hummus with carrots, cucumber, and toasted whole-wheat pita wedges.",
    "servings": 1,
    "calories": 298,
    "protein": 11.7,
    "carbs": 50.2,
    "fat": 7.9,
    "fiber": 11.4,
    "prep": "7 min",
    "cook": "3 min",
    "ingredients": [
      "70 g hummus",
      "120 g carrot sticks",
      "100 g cucumber spears",
      "1 small whole-wheat pita, about 45 g",
      "Paprika and parsley"
    ],
    "steps": [
      "Cut pita into wedges.",
      "Toast wedges in a dry skillet or toaster until lightly crisp.",
      "Spoon hummus onto a plate and sprinkle with paprika and parsley.",
      "Serve with carrot sticks, cucumber, and pita wedges."
    ],
    "tags": [
      "hummus",
      "pita"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  },
  {
    "id": "pistachio-banana-yogurt-cup",
    "category": "Snack",
    "name": "Pistachio Banana Yogurt Cup",
    "description": "Greek yogurt with banana, pistachios, cinnamon, and a touch of honey.",
    "servings": 1,
    "calories": 275,
    "protein": 23.9,
    "carbs": 33.7,
    "fat": 6.5,
    "fiber": 3.4,
    "prep": "5 min",
    "cook": "0 min",
    "ingredients": [
      "200 g plain nonfat Greek yogurt",
      "80 g sliced banana",
      "12 g pistachios",
      "6 g honey",
      "Cinnamon"
    ],
    "steps": [
      "Spoon yogurt into a cup or bowl.",
      "Top with banana and pistachios.",
      "Drizzle with honey.",
      "Finish with cinnamon and serve cold."
    ],
    "tags": [
      "no cook",
      "yogurt"
    ],
    "nutritionMethod": "Calculated from listed gram weights using USDA FoodData Central reference values; fixed reference-label values are used for protein powder, pita, tortilla, granola, tzatziki, dressing, and sandwich thins."
  }
];
