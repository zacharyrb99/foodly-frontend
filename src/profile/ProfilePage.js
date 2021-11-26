import { useContext } from "react"; 
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router";
import { Button } from "reactstrap";

const ProfilePage = () => {
    const { currUser } = useContext(UserContext);
    const navigate = useNavigate()

    const updateForm = () => navigate("/profile/update");

    return (
        <div>
            <h1> {`${currUser.firstName} ${currUser.lastName}`} </h1>
            <Button onClick={updateForm}> Update User </Button>
        </div>
    )
}

export default ProfilePage;