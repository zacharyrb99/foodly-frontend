import { Route, Routes, Navigate } from "react-router-dom";
import RecipeList from "../recipes/RecipeList";
import RecipeDetail from "../recipes/RecipeDetail";
import CocktailList from "../cocktails/CocktailList";
import CocktailDetail from "../cocktails/CocktailDetail";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import ProfilePage from "../profile/ProfilePage";
import ProfileForm from "../profile/ProfileForm";
import Homepage from "../homepage/Homepage";
import { useContext } from "react";
import UserContext from "../auth/UserContext";

const AppRoutes = ({setToken}) => {
    const { currUser } = useContext(UserContext);

    return (
        <Routes>
            <Route exact path="/" element={<Homepage />} />

            <Route exact path="/recipes" element={currUser ? <RecipeList /> : <Navigate to="/" />} />

            <Route exact path="/recipes/:id" element={currUser ? <RecipeDetail /> : <Navigate to="/" />} />

            <Route exact path="/cocktails" element={currUser ? <CocktailList /> : <Navigate to="/" />} />

            <Route exact path="/cocktails/:id" element={currUser ? <CocktailDetail /> : <Navigate to="/" />} />

            <Route exact path="/login" element={<LoginForm setToken={setToken}/>} />

            <Route exact path="/register" element={<SignUpForm setToken={setToken}/>} />

            <Route exact path="/profile" element={currUser ? <ProfilePage /> : <Navigate to="/" /> }/>

            <Route exact path="/profile/update" element={<ProfileForm />} />
        </Routes>
    )
}

export default AppRoutes;