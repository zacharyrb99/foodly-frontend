import { useNavigate } from 'react-router';
import {Card, CardImg, CardBody, CardSubtitle, CardText, CardTitle} from 'reactstrap';
import "./CocktailCard.css"

const CocktailCard = ({cocktail}) => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate(`/cocktails/${cocktail.idDrink}`);
    }
    
    return (
        <Card className="CocktailCard" onClick={redirect}>
            <CardImg src={cocktail.strDrinkThumb} />
            <CardBody>
                <CardTitle tag="h5"> {cocktail.strDrink} </CardTitle>
                <CardSubtitle tag="h6" className="text-muted"> {`${cocktail.strCategory}, ${cocktail.strAlcoholic}`} </CardSubtitle>
                <CardText> {(cocktail.strInstructions).slice(0, 150)}... </CardText>
            </CardBody>
        </Card>
    )
}

export default CocktailCard;