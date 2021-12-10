import { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import API from "../API";
import "./ProfileForm.css"

const ProfileForm = () => {
    const { currUser, setCurrUser } = useContext(UserContext);

    const INITIAL_STATE = {
        username: currUser.username,
        password: "",
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const [updateConfirmed, setUpdateConfirmed] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let updateData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }

        let updatedProfile;

        try {
            updatedProfile = await API.updateUser(currUser.username, updateData);
        } catch (e) {
            setFormErrors(e);
            return;
        }

        setFormData(formData => ({
            ...formData,
            password: ""
        }));

        setFormErrors([]);
        setUpdateConfirmed(true);
        setCurrUser(updatedProfile);
    }

    return (
        <div>
            <Form className="ProfileForm" onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label for="username"> Username: </Label>
                    <Input type="text" name="username" id="username" value={formData.username} readonly />
                </FormGroup>

                <FormGroup row>
                    <Label for="firstName"> First Name: </Label>
                    <Input type="text" name="firstName" id="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                </FormGroup>

                <FormGroup row>
                    <Label for="lastName"> Last Name: </Label>
                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                </FormGroup>

                <FormGroup row>
                    <Label for="email"> Email: </Label>
                    <Input type="text" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                </FormGroup>
                
                <FormGroup row>
                    <Label for="password"> Confirm Password to Update User: </Label>
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

                {updateConfirmed ?
                    <div className='alert alert-success' role='alert'>
                        <p>Updated Successfully</p>
                    </div>
                    : null}

                <Button type="submit" className='ProfileForm-button' outline color='primary'>Update User</Button>
            </Form>
        </div>
    )
}

export default ProfileForm;