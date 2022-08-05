
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notify from "../../../Services/NotifyService";
import socketService from "../../../Services/socketService";
import vacationsService from "../../../Services/VacationService";
import config from "../../../Utils/Config";
import "./UpdateVacation.css";

function UpdateVacation(): JSX.Element {

    const params = useParams();
    const id = +params.id!;
    window.scrollTo(0, 0);

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();

    const navigate = useNavigate();

    let currDate = new Date().toString();
    const newCurrDate = vacationsService.formatDateTime(currDate);

    useEffect(() => {
        vacationsService.getOneVacation(id)
            .then(vacation => {
                setValue("description", vacation.description);
                setValue("location", vacation.location);
                setValue("price", vacation.price);
                setValue("startDate", vacationsService.formatDateTime(vacation.startDate));
                setValue("endDate", vacationsService.formatDateTime(vacation.endDate));
            })
            .catch(err => notify.error(err));
    }, []);

    async function submit(vacation: VacationModel) {
        
        try {
            console.log(typeof(vacation.startDate));
            vacation.vacationId = id;
            const updatedVacation = await vacationsService.updateVacation(vacation);
            updatedVacation.vacationId = id
            socketService.sendUpdate(updatedVacation);
            
            notify.success("Vacation has been Updated!");

            navigate("/vacations"); 
    
        }
        catch (err: any) {
            notify.error(err);
        }
    }


    return (
        <div className="UpdateVacation Box">

            <form onSubmit={handleSubmit(submit)}>

                <h2>Update Product</h2>

                <label>Description: </label>
                <input className="form-control" type="text" required {...register("description", {
                    required: { value: true, message: "Missing description" }
                })} />
                <span>{formState.errors.description?.message}</span>

                <label>Location: </label>
                <input className="form-control" type="text" required {...register("location", {
                    required: { value: true, message: "Missing location" }
                })} />
                <span>{formState.errors.location?.message}</span>

                <label>Price: </label>
                <input className="form-control" type="number" step="0.01" required {...register("price", {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 1000, message: "Price can't exceed 1000" },
                })} />
                <span>{formState.errors.price?.message}</span>

                <label>Start date:</label>
                <input className="form-control" type="date" min={newCurrDate} required {...register("startDate", {
                    required: { value: true, message: "Missing start date" },
                })} />
                <span>{formState.errors.startDate?.message}</span>

                <label>End date:</label>
                <input className="form-control" type="date" min={newCurrDate} required  {...register("endDate", {
                    required: { value: true, message: "Missing end date" }
                })} />
                <span>{formState.errors.endDate?.message}</span>

                <label>Image: </label>
                <input className="form-control" type="file" accept="image/*" required {...register("image")} />

                <button className="btn btn-primary">Edit</button>

            </form>

        </div>
    );
}

export default UpdateVacation;

function formatDateTime(startDate: string): string {
    throw new Error("Function not implemented.");
}
