import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Col, Row, Button } from "reactstrap";
import UserContext from "../auth/UserContext";
import "./CocktailDetail.css";

const CocktailDetail = () => {
    const { alreadySavedCocktail, saveCocktail } = useContext(UserContext);
    const [drinkInfo, setDrinkInfo] = useState([]);
    const [ingredientsKeys, setIngredientsKeys] = useState(null);
    const [measurementsKeys, setMeasurementsKeys] = useState(null);
    const [savedCocktail, setSavedCocktail] = useState();
    const { id } = useParams();

    useEffect(() => {
        const getDrinkInfo = async id => {
            try {
                let drink = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                setDrinkInfo(drink.data.drinks[0]);

                let ingredientKeys = Object.keys(drinkInfo);
                setIngredientsKeys(ingredientKeys.filter(i => i.includes("Ingredient")));

                let measurmentKeys = Object.keys(drinkInfo);
                setMeasurementsKeys(measurmentKeys.filter(i => i.includes("Measure")));
            } catch (e) {
                console.error(e);
            }
        }

        getDrinkInfo(id);
    }, [id, drinkInfo, alreadySavedCocktail]);

    useEffect(() => {
        setSavedCocktail(alreadySavedCocktail(+drinkInfo.idDrink));
    }, [drinkInfo.idDrink, alreadySavedCocktail]);

    const handleSaveCocktail = async e => {
        if (alreadySavedCocktail(+drinkInfo.idDrink)) return;
        saveCocktail(+drinkInfo.idDrink, drinkInfo.strDrink, drinkInfo.strInstructions, drinkInfo.strDrinkThumb);
        setSavedCocktail(true);
    }

    if (!drinkInfo || !ingredientsKeys || !measurementsKeys) return <h1> ...Loading </h1>

    return (
        <div className="CocktailDetail">
            <h1> {drinkInfo.strDrink} </h1>
            <Row>
                <Col>
                    <img src={drinkInfo.strDrinkThumb}/>
                    <p> {drinkInfo.strCategory}, {drinkInfo.strAlcoholic} </p>

                    {!savedCocktail 
                        ? <Button className="CocktailDetail-button" color="danger" onClick={handleSaveCocktail}> Save Cocktail </Button> 
                        : <Button className="CocktailDetail-button" color="success" disabled> Already Saved </Button>}
                </Col>

                <Col>
                    <p> {drinkInfo.strInstructions} </p>

                    <Row>
                        <Col>
                            <h6> <b> Ingredients: </b> </h6>
                            <ol>
                                {ingredientsKeys
                                    .filter(k => drinkInfo[k] !== null && drinkInfo[k].length > 0)
                                    .map(k => <li> {drinkInfo[k]} </li>)}                     
                            </ol>
                        </Col>

                        <Col>
                            <h6> <b> Measurements: </b> </h6>
                            <ol>
                                {measurementsKeys
                                    .filter(k => drinkInfo[k] !== null && drinkInfo[k].length > 0)
                                    .map(k => <li> {drinkInfo[k]} </li>)}
                            </ol>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default CocktailDetail;