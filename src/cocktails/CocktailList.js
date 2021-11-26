import { useState } from "react";
import API from "../API";
import CocktailCard from "./CocktailCard";
import CocktailSearchForm from "./CocktailSearchForm";
import { Row, Col } from "reactstrap";
import "./CocktailList.css";

const CocktailList = () => {
    const [cocktails, setCocktails] = useState(null);
    
    const searchCocktails = async searchTerm => {
        let cocktailSearch = await API.searchCocktails(searchTerm);
        setCocktails(cocktailSearch);
    }

    return (
        <div className="CocktailList">
            <CocktailSearchForm searchCocktails={searchCocktails} />

            {!cocktails 
                ? <h1 className="CocktailList-header"> Search for a cocktail! </h1> 
                : null}            
            
            <Row className="CocktailList-row">
                    {cocktails 
                        ? cocktails.map(cocktail => {
                            return <Col> <CocktailCard key={cocktail.id} cocktail={cocktail}/> </Col>
                            })
                        : null
                    }
            </Row>
        </div>
    )
}

export default CocktailList;