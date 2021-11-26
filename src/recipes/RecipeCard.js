import { useNavigate } from 'react-router';
import {Card, CardImg, CardBody, CardSubtitle, CardText, CardTitle} from 'reactstrap';
import "./RecipeCard.css"

const RecipeCard = ({recipe}) => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate(`/recipes/${recipe.idMeal}`);
    }

    return (
        <Card className="RecipeCard" onClick={redirect}>
            <CardImg src={recipe.strMealThumb} />
            <CardBody>
                <CardTitle tag="h5"> {recipe.strMeal} </CardTitle>
                <CardSubtitle tag="h6" className="text-muted"> {`${recipe.strCategory}, ${recipe.strArea}`} </CardSubtitle>
                <CardText> {(recipe.strInstructions).slice(0, 150)}... </CardText>
                <CardText> <a href={recipe.strYoutube}> Video Link </a> </CardText>
            </CardBody>
        </Card>
    )
}

export default RecipeCard;