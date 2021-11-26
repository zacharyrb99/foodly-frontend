import { Route, Routes } from "react-router-dom";
import RecipeList from "../recipes/RecipeList";
import RecipeDetail from "../recipes/RecipeDetail";
import CocktailList from "../cocktails/CocktailList";
import CocktailDetail from "../cocktails/CocktailDetail";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import ProfilePage from "../profile/ProfilePage";
import ProfileForm from "../profile/ProfileForm";

const AppRoutes = ({setToken}) => {
    return (
        <Routes>
            <Route exact path="/" element={<h1>Homepage</h1>} />

            <Route exact path="/recipes" element={<RecipeList />} />

            <Route exact path="/recipes/:id" element={<RecipeDetail />} />

            <Route exact path="/cocktails" element={<CocktailList />} />

            <Route exact path="/cocktails/:id" element={<CocktailDetail />} />

            <Route exact path="/login" element={<LoginForm setToken={setToken}/>} />

            <Route exact path="/register" element={<SignUpForm setToken={setToken}/>} />

            <Route exact path="/profile" element={<ProfilePage />} />

            <Route exact path="/profile/update" element={<ProfileForm />} />
        </Routes>
    )
}

export default AppRoutes;