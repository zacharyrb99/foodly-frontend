import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./RecipeSearchForm.css";

const RecipeSearchForm = ({searchRecipes}) => {
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
        
        searchRecipes(formData.searchTerm);
        setFormData(INITIAL_STATE);
    }

    return (
        <div>
            <Form className="RecipeSearchForm" onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="searchTerm">Recipe Search: </Label>
                    <Input type="text" name="searchTerm" id="searchTerm" value={formData.searchTerm} onChange={handleChange}/>
                </FormGroup>

                <Button type="submit" className='RecipeSearchForm-button' outline color='primary'>Search</Button>
            </Form>
        </div>
    )
}

export default RecipeSearchForm;