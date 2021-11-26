import { useContext } from "react";
import { useNavigate } from "react-router";
import { FaUtensils as Utensils } from "react-icons/fa";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import UserContext from "../auth/UserContext";
import "./NavBar.css"; 

const NavBar = ({logout}) => {
    const { currUser } = useContext(UserContext);
    const navigate = useNavigate();

    const redirect = () => {
        logout();
        navigate("/");
    }

    const loggedOut = () => {
        return (
            <>
                <NavItem>
                    <NavLink className="nav-item" href="/login"> Login </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className="nav-item" href="/register"> Sign Up </NavLink>
                </NavItem>
            </>
        )
    }

    const loggedIn = () => {
        return (
            <>
                <NavItem>
                    <NavLink className="nav-item" href="/recipes"> Recipes </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className="nav-item" href="/cocktails"> Cocktails </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className="nav-item" href="/profile"> Profile </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink className="nav-item" onClick={redirect}> Log Out </NavLink>
                </NavItem>
            </>
        )
    }

    return (
        <div>
            <Navbar>
                <NavbarBrand className="navbar-brand" href="/">
                    <Utensils />
                </NavbarBrand>

                <Nav>
                    {currUser ? loggedIn() : loggedOut()}
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;