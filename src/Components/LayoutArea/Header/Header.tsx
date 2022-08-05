import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Menu2 from "../Menu/menu2";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />
            <div className="headerStyle">
            <NavLink className="title" to={"/home"}><h2>Home </h2></NavLink>&nbsp;&nbsp;
            <Menu2 />
            </div>
        </div>
    );
}


export default Header;
