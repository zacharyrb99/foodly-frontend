import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./navbar&routes/NavBar";
import AppRoutes from './navbar&routes/AppRoutes';
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import API from './API';
import UserContext from "./auth/UserContext";
import './App.css';

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [currUser, setCurrUser] = useState(null);
    const [savedRecipeIds, setSavedRecipeIds] = useState(new Set([]));
    const [savedCocktailIds, setSavedCocktailIds] = useState(new Set([]));
    const [token, setToken] = useLocalStorage("token");
    
    useEffect(() => {
        const getCurrentUser = async () => {
            if (token) {
                try {
                    let { username } = jwt.decode(token);
                    API.token = token;
                    let currentUser = await API.getCurrUser(username);
                    setCurrUser(currentUser);
                    setSavedRecipeIds(new Set(currentUser.savedRecipes));
                    setSavedCocktailIds(new Set(currentUser.savedCocktails));
                } catch (e) {
                    setCurrUser(null);
                }
            }

            setInfoLoaded(true);
        }

        setInfoLoaded(false);
        getCurrentUser();
    }, [token   ]);

    const alreadySavedRecipe = id => {
      return savedRecipeIds.has(id);
    }

    const saveRecipe = async (id, name, instructions, img_url) => {
        if (alreadySavedRecipe(id)) return;

        try {
            await API.createRecipe(id, name, instructions, img_url);
            await API.saveRecipe(currUser.username, id);
        } catch (e) {
            await API.saveRecipe(currUser.username, id);
        }
    }

    const unsaveRecipe = async (id) => {
        if (!alreadySavedRecipe(id)) return;

        try {
            await API.unsaveRecipe(currUser.username, id);
        } catch (e) {
            console.error(e);
        }
    }

    const alreadySavedCocktail = id => {
      return savedCocktailIds.has(id);
    }

    const saveCocktail = async (id, name, instructions, img_url) => {
      if (alreadySavedCocktail(id)) return;

      try {
          await API.createCocktail(id, name, instructions, img_url);
          await API.saveCocktail(currUser.username, id);
      } catch (e) {
          await API.saveCocktail(currUser.username, id);
      }
    }

    const unsaveCocktail = async (id) => {
        if (!alreadySavedCocktail(id)) return;

        try {
            await API.unsaveCocktail(currUser.username, id);
        } catch (e) {
            console.error(e);
        }
    }

    const logout = () => {
        setCurrUser(null);
        setToken(null);
    }

    if (!infoLoaded) {
        return (
          <div className="App-loading">
              <h1> Loading... </h1>
          </div>
        )
    }

    return (
        <BrowserRouter>
            <UserContext.Provider value={{currUser, setCurrUser, alreadySavedRecipe, saveRecipe, unsaveRecipe, alreadySavedCocktail, saveCocktail, unsaveCocktail}}>
                <div className="App">
                    <NavBar logout={logout} />
                    <AppRoutes setToken={setToken} />
                </div>
            </ UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
