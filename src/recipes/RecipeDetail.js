import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Col, Row, Button } from "reactstrap";
import UserContext from "../auth/UserContext";
import "./RecipeDetail.css";

const RecipeDetail = () => {
    const { alreadySavedRecipe, saveRecipe, unsaveRecipe } = useContext(UserContext);
    const [recipeInfo, setRecipeInfo] = useState([]);
    const [ingredientsKeys, setIngredientsKeys] = useState(null);
    const [measurementsKeys, setMeasurementsKeys] = useState(null);
    const [savedRecipe, setSavedRecipe] = useState();
    const { id } = useParams();

    useEffect(() => {
        const getRecipeInfo = async id => {
            try {
                let recipe = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                setRecipeInfo(recipe.data.meals[0]);

                let ingredientKeys = Object.keys(recipeInfo);
                setIngredientsKeys(ingredientKeys.filter(i => i.includes("Ingredient")));

                let measurmentKeys = Object.keys(recipeInfo);
                setMeasurementsKeys(measurmentKeys.filter(i => i.includes("Measure")));
            } catch (e) {
                console.error(e);
            }
        }

        getRecipeInfo(id);
    }, [id, recipeInfo]);

    useEffect(() => {
        setSavedRecipe(alreadySavedRecipe(+recipeInfo.idMeal));
    }, [recipeInfo.idMeal, alreadySavedRecipe]);

    const handleSave = async e => {
        if (alreadySavedRecipe(+recipeInfo.idMeal)) {
            await unsaveRecipe(+recipeInfo.idMeal);
            setSavedRecipe(false);
            window.location.reload(true);
        } else {
            await saveRecipe(+recipeInfo.idMeal, recipeInfo.strMeal, recipeInfo.strInstructions, recipeInfo.strMealThumb);
            setSavedRecipe(true);
            window.location.reload(true);
        }
    }

    if (!recipeInfo || !ingredientsKeys || !measurementsKeys) return <h1> ...Loading </h1>

    return (
        <div className="RecipeDetail">
            <h1> {recipeInfo.strMeal} </h1>
            <Row>
                <Col>
                    <img src={recipeInfo.strMealThumb}/>
                    <p> {recipeInfo.strCategory}, {recipeInfo.strArea} </p>
                    
                    <Row>
                        <Col>
                            <h6> <b> Ingredients: </b> </h6>
                            <ol>
                                {ingredientsKeys
                                    .filter(k => recipeInfo[k] !== null && recipeInfo[k].length > 0 && recipeInfo[k] !== " ")
                                    .map(k => <li> {recipeInfo[k]} </li>)}                     
                            </ol>
                        </Col>
                        
                        <Col>
                            <h6> <b> Measurements: </b> </h6>
                            <ol>
                                {measurementsKeys
                                    .filter(k => recipeInfo[k] !== null && recipeInfo[k].length > 0 && recipeInfo[k] !== " ")
                                    .map(k => <li> {recipeInfo[k]} </li>)}
                            </ol>
                        </Col>
                    </Row>
                </Col>

                <Col>
                    {recipeInfo.strYoutube.length > 0 
                        ? <p> <a href={recipeInfo.strYoutube}> Watch this recipe on Youtube! </a> </p>
                        : null}

                    <p> {recipeInfo.strInstructions} </p>

                    {/* {!savedRecipe 
                        ? <Button className="RecipeCard-button" color="danger" onClick={handleSaveRecipe}> Save Recipe </ Button> 
                        : <Button className="RecipeCard-button" color="success" onClick={handleUnsaveRecipe}> Already Saved </Button>
                    } */}

                    {!savedRecipe 
                        ? <Button className="RecipeCard-button" color="success" onClick={handleSave}> Save Recipe </ Button> 
                        : <Button className="RecipeCard-button" color="danger" onClick={handleSave}> Unsave Recipe </Button>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default RecipeDetail;