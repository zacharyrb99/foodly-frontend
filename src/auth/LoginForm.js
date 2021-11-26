import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../API";
import "./LoginForm.css";

const LoginForm = ({setToken}) => {
    const INITIAL_STATE = {
        username: "",
        password: ""
    }

    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            let token = await API.logIn(formData.username, formData.password);
            setToken(token);
            navigate("/");
        } catch (e) {
            setFormErrors(e);
        }
    }

    return (
        <div>
            <Form className="LogInForm" onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="username">Username: </Label>
                    <Input type="text" name="username" id="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                </FormGroup>

                <FormGroup row>
                    <Label for="password">Password: </Label>
                    <Input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                </FormGroup>

                {formErrors.length ? 
                    <div className='alert alert-danger' role='alert'>
                        {formErrors.map(e => (
                            <p className='mb-0 small'>
                                {e}
                            </p>
                        ))}
                    </div>
                    : null}

                <Button type="submit" className='LogInForm-button' outline color='primary'>Log In</Button>
            </Form>
        </div>
    )
}

export default LoginForm;