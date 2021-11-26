import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./CocktailSearchForm.css";

const CocktailSearchForm = ({searchCocktails}) => {
    const INITIAL_STATE = {
        searchTerm: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();

        searchCocktails(formData.searchTerm);
        setFormData(INITIAL_STATE);
    }

    return (
        <div>
            <Form className="CocktailSearchForm" onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="searchTerm">Cocktail Search: </Label>
                    <Input type="text" name="searchTerm" id="searchTerm" value={formData.searchTerm} onChange={handleChange}/>
                </FormGroup>

                <Button type="submit" className='CocktailSearchForm-button' outline color='primary'>Search</Button>
            </Form>
        </div>
    )
}

export default CocktailSearchForm