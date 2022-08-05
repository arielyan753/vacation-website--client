import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel|null>(null);

    // Register 
    useEffect(() => {

        // Once - update user at component load: 
        setUser(store.getState().authState.user);

        // Subscribe to store changes - whenever AuthState change - report it:
        const unsubscribeMe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        // When component destroyed:
        return () => unsubscribeMe();

    }, []);

    return (
        <div className="AuthMenu">
            {user === null ?
                <>
                    <span>Hello Guest</span>
                    <span className="spaceBar"> | </span>
                    <NavLink to="/login">Login</NavLink>
         
                </>
                :
                <>
                    <span>Hello {user.firstName} {user.lastName}</span>
                    <span className="spaceBar"> | </span>
                    <NavLink to="/logout">Logout</NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;
