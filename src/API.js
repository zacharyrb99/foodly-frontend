import axios from "axios";

const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://capstone2-foodly-backend.herokuapp.com";

class API {
    // Token used for authorization
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call: ", endpoint, data, method);

        // Passes a token for authorization in the header 
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${API.token }` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (e) {
            console.error("API Error: ", e.response);
            let msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg];
        }
    }

    // API routes:

    // Search Recipe
    static async searchRecipes(searchTerm) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        let res = await axios.get(url);
        

        return res.data.meals;
    }

    // Create Recipe
    static async createRecipe(id, name, instructions, img_url) {
        let recipeData = { id, name, instructions, img_url };

        let res = await this.request("recipes", recipeData, "post");
        return res.recipe;
    }

    // Get Recipe
    static async getRecipe(id) {
        let res = await this.request(`recipes/${id}`);
        return res.recipe;
    }

    // Save Recipe to User
    static async saveRecipe(username, recipeId) {
        let res = await this.request(`users/${username}/recipes/${recipeId}`, {}, "post");
        return res.saved;
    }

    // Unsave recipe from user
    static async unsaveRecipe(username, recipeId) {
        let res = await this.request(`users/${username}/recipes/${recipeId}`, {}, "delete");
        return res.unsaved;
    }

    // ************************************************************************************************************

    // Search Cocktail
    static async searchCocktails(searchTerm) {
        let res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);

        return res.data.drinks;
    }

    // Create Cocktail
    static async createCocktail(id, name, instructions, img_url) {
        let cocktailData = { id, name, instructions, img_url };

        let res = await this.request("cocktails", cocktailData, "post");
        return res.cocktail;
    }

    // Get Cocktail
    static async getCocktail(id) {
        let res = await this.request(`cocktails/${id}`);
        return res.cocktail;
    }

    // Save Cocktail to User
    static async saveCocktail(username, cocktailId) {
        let res = await this.request(`users/${username}/cocktails/${cocktailId}`, {}, "post");
        return res.saved;
    }

    // Unsave Cocktail from user
    static async unsaveCocktail(username, cocktailId) {
        let res = await this.request(`users/${username}/cocktails/${cocktailId}`, {}, "delete");
        return res.unsaved;
    }

    // ************************************************************************************************************

    // Sign up for a profile
    static async signUp(username, password, firstName, lastName, email) {
        let signUpData = { username, password, firstName, lastName, email };

        let res = await this.request("auth/register", signUpData, "post");
        return res.token;
    }

    // Log in to your profile
    static async logIn(username, password) {
        let loginData = { username, password };
        
        let res = await this.request("auth/login", loginData, "post");
        return res.token;
    }

    // Get currUser 
    static async getCurrUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    // Update User
    static async updateUser(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    // Delete User
    static async deleteUser(username) {
        let res = await this.request(`users/${username}`, {}, "delete");
        return res.deleted;
    }
}

export default API;