# [Foodly](https://foodly-capstone2.netlify.app/)

## Features:
This site allows you to search for new recipes and cocktails to add to your diet. If you like a recipe or cocktail that you found, you can then save it and find it easily on your profile page.

1. Log in or sign up
    - I chose to make the app require a user to log in to use most of its features. This simplified the saving feature for recipes & cocktails.    The only thing you will be able to do while anonymous is view the homepage. 
2. Search recipes or cocktails.
    - I set the search funtionality up to be able to allow users to search for a recipe/cocktail based on a single search term. There is possibility for expansion into search by ingredient or area (Indian, Thai, American, etc.).
3. Save recipes or cocktails
    - This feature allows users to easily look back at recipes they found interesting. Traveling to the profile page will show a user all their saved recipes.
4. Update user profile
    - This will allow a user to change their name and email, and requires password authentication. User currently aren't able to change their username or password.

## Flow
1. Create an account.
2. Head to recipe search page.
3. Search for favorite recipe.
4. Click on different recipes to see more details and find your favorite.
5. Save the recipes that you find interesting or want to make later.
6. Head to profile page when you want to look at these recipes again.

## Testing
All the tests are located on the [backend repo](https://github.com/zacharyrb99/capstone2-backend). Simply open this folder in your terminal and run `npm run test`

## Data Supplied By:
__Data was inconsistent at times, so there may be some styling issues on occasion for certain recipes/cocktails__

1. [Meals](https://www.themealdb.com/api.php)
2. [Drinks](https://www.thecocktaildb.com/api.php)

## Tech Stack:
- __Front-end__: React
- __Back-end__: Nodejs, Express
- __Database__: Postgresql