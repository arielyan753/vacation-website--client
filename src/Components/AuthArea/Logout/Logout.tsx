import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";

function Logout(): JSX.Element | null{

    const navigate = useNavigate();

    useEffect(() => {

        authService.logout();

        notify.success("You are now logged-out");

        navigate("/home");
        
    }, []);

    return null;
}

export default Logout;
