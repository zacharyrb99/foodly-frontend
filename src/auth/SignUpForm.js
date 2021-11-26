import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../API";
import "./SignUpForm.css";

const SignUpForm = ({setToken}) => {
    const INITIAL_STATE = {
        username: "",
        password1: "",
        password2: "",
        firstName: "",
        lastName: "",
        email: ""
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
            if (formData.password1 !== formData.password2) {
                setFormErrors(["Passwords must match."]);
                return;
            }
            let token = await API.signUp(formData.username, formData.password1, formData.firstName, formData.lastName, formData.email);
            setToken(token);
            navigate("/");
        } catch (e) {
            setFormErrors(e);
        }
    }

    return (
        <div>
            <Form className="SignUpForm" onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="username">Username: </Label>
                    <Input type="text" name="username" id="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                </FormGroup>

                <FormGroup row>
                    <Label for="password1">Password: </Label>
                    <Input type="password" name="password1" id="password1" placeholder="Password" value={formData.password} onChange={handleChange} />
                </FormGroup>

                <FormGroup row>
                    <Label for="password2">Password: </Label>
                    <Input type="password" name="password2" id="password2" placeholder="Password" value={formData.password} onChange={handleChange} />
                </FormGroup>

                <FormGroup row>
                    <Label for="firstName">First Name: </Label>
                    <Input type="text" name="firstName" id="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                </FormGroup>

                <FormGroup row>
                    <Label for="lastName">Last Name: </Label>
                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                </FormGroup>

                <FormGroup row>
                    <Label for="email">Email: </Label>
                    <Input type="text" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
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

                <Button type="submit" className='SignUpForm-button' outline color='primary'>Sign Up</Button>
            </Form>
        </div>
    )
}

export default SignUpForm;