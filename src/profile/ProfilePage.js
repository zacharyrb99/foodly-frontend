import { useContext, useEffect, useState } from "react"; 
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router";
import { Button, Row, Col } from "reactstrap";
import axios from "axios";
import RecipeCard from "../recipes/RecipeCard";
import CocktailCard from "../cocktails/CocktailCard";
import API from "../API";
import "./ProfilePage.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { currUser } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);
    const [cocktails, setCocktails] = useState([]);

    const updateForm = () => navigate("/profile/update");

    useEffect(() => {
        const getRecipeInfo = (arr) => {
            try {
                arr.forEach(async id => {
                    let recipe = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                    setRecipes(r => [...r, recipe.data.meals[0]]);
                });
            } catch (e) {
                console.error(e);
            }
        }

        const getCocktailInfo = (arr) => {
            try {
                arr.forEach(async id => {
                    let cocktail = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                    setCocktails(c => [...c, cocktail.data.drinks[0]]);
                });
            } catch (e) {
                console.error(e);
            }
        }

        getRecipeInfo(currUser.savedRecipes);
        getCocktailInfo(currUser.savedCocktails);
    }, [currUser]);

    if (!recipes) return <h1> ...Loading </h1>

    return (
        <div>
            <span>
                <h1> {`${currUser.firstName} ${currUser.lastName}`} </h1>
                <Button onClick={updateForm}> Update User </Button>
            </span>

            <div className="ProfilePage-saved">
                <Row>
                    <Col>
                        <h1> Saved Recipes: </h1>
                        {recipes.length > 0 
                            ? recipes.map(recipe => {
                                return <RecipeCard recipe={recipe} />
                            }) 
                            : <h4> No Saved Recipes </h4>
                        }
                    </Col>

                    <Col>
                        <h1> Saved Cocktails: </h1>
                        {cocktails.length > 0  
                            ? cocktails.map(cocktail => {
                                return <CocktailCard cocktail={cocktail} />
                            }) 
                            : <h4> No Saved Cocktails </h4>
                        }
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ProfilePage;