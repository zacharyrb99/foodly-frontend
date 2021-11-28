import { useState } from "react";
import API from "../API";
import RecipeCard from "./RecipeCard";
import RecipeSearchForm from "./RecipeSearchForm";
import { Row, Col } from "reactstrap";
import "./RecipeList.css"

const RecipeList = () => {
    const [recipes, setRecipes] = useState(null);

    const searchRecipes = async searchTerm => {
        let recipeSearch = await API.searchRecipes(searchTerm);
        setRecipes(recipeSearch);
    }

    return (
        <div className="RecipeList">
            <h1> Recipe Search </h1>
            <RecipeSearchForm searchRecipes={searchRecipes} />          
            
            <Row className="RecipeList-row">
                    {recipes 
                        ? recipes.map(recipe => {
                            console.log(recipe);
                            return <Col> <RecipeCard key={recipe.id} recipe={recipe}/> </Col>
                            })
                        : null
                    }
            </Row>
        </div>
    )
}

export default RecipeList;