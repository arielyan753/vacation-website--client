import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import "./Menu.css";

function Menu2(): JSX.Element {

    const [flag, setFlag] = useState('');
    const navigate = useNavigate();



    useEffect(() => {

            // const user = store.getState().authState.token;
            // setFlag(user);
    }, []);

    const test = () => {
        const token = localStorage.getItem("token");
        console.log(token)
        if(token){
            navigate("/vacations");
        }
        else{
            navigate("/login");
        }
    }

    return (
        <div className="Menu">
            <div className="vacationMenu">
            <button onClick={test}>Vacation</button>
            </div>
        </div>
    );
}

export default Menu2;
