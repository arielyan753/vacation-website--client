import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<UserModel>();

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notify.success("You are now registered");
            navigate("/vacations");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Register Box">

			<h2 className="display-3">Register</h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>First name: </label>
                <input className="form-control" type="text" {...register("firstName")} />

                <label>Last name: </label>
                <input className="form-control" type="text" {...register("lastName")} />

                <label>Username: </label>
                <input className="form-control" type="text" {...register("username")} />

                <label>Password: </label>
                <input className="form-control" type="password" {...register("password")} />

                <button className="btn btn-primary">Register</button>

            </form>

        </div>
    );
}

export default Register;
