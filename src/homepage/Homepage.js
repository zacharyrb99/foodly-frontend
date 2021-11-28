import { useContext } from "react";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

const Homepage = () => {
    const { currUser } = useContext(UserContext);

    const loggedIn = () => {
        return (
            <div className="Homepage">
                <h1> Welcome back {`${currUser.firstName} ${currUser.lastName}`}! </h1>
                <h4> 
                    Try searching for some new <a href="/recipes">recipes</a> or <a href="/cocktails">cocktails</a> to make later. 
                </h4>
            </div>
        )
    }

    const loggedOut = () => {
        return (
            <div className="Homepage">
                <h1> Foodly: </h1>
                <h5> A place to go to find all your meal or cocktail recipes! </h5>
                <p> Use this platform to check out hundreds of different meals and cocktail recipes to spice up your diet. </p>
                <p>
                    <b> Consider <a href="/register">signing up</a> for an account or <a href="/login">log in</a> if you are already a user. </b>
                </p>
            </div>
        )
    }

    return (
        <div>
            {currUser ? loggedIn() : loggedOut()}
        </div>
    )
}

export default Homepage;