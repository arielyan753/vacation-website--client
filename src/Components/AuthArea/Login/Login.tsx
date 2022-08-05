import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function submit(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notify.success("You are now logged-in");

            navigate("/vacations");
        }
        catch(err: any) {
            notify.error(err);
        }
        
    }

    return (
        <div className="Login Box">

			<h2 className="display-3">Login</h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>Username: </label>
                <input className="form-control" type="text" {...register("username")} />

                <label>Password: </label>
                <input className="form-control" type="password" {...register("password")} />

                <button className="btn btn-primary">Login</button>

                <p>New member? <NavLink to={'/register'}>register</NavLink> here</p>

            </form>

        </div>
    );
}

export default Login;
