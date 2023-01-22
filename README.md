# Foodly frontend
A responsive front end that utilizes my API driven [**backend**](https://github.com/zacharyrb99/foodly-backend) to allow you to search for and incorporate new food and drink recipes in your diet. It allows you to save your favorite food or drink recipes for easy access in the future.

## Table of Contents
- Requirements
- Installation
- Start
- Features
- Data

## Requirements 
1. NPM

## Installation
To install the required dependencies, it is straight forward thanks to NPM:
`npm i`

## Start
NPM makes it easy to spin up the backend server: 
`npm start`

## Features:
1. Log in or sign up
    - I chose to make the app require a user to log in to use most of its features. This simplified the saving feature for recipes & cocktails.    The only thing you will be able to do while anonymous is view the homepage. 
2. Search recipes or cocktails.
    - I set the search funtionality up to be able to allow users to search for a recipe/cocktail based on a single search term. There is possibility for expansion into search by ingredient or area (Indian, Thai, American, etc.).
3. Save recipes or cocktails
    - This feature allows users to easily look back at recipes they found interesting. Traveling to the profile page will show a user all their saved recipes.
4. Update user profile
    - This will allow a user to change their name and email, and requires password authentication. User currently aren't able to change their username or password.

## Data Supplied By:
__Data was inconsistent at times, so there may be some styling issues on occasion for certain recipes/cocktails__

1. [Meals](https://www.themealdb.com/api.php)
2. [Drinks](https://www.thecocktaildb.com/api.php)