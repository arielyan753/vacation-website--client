import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import VacationModel from "../Models/VacationModel";

import store from "../Redux/Store";
import { addVacationAction, deleteVacationAction, fetchVacationsAction, updateVacationAction } from "../Redux/VacationState";
import config from "../Utils/Config";

class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {

        const userId = store.getState().authState.user.userId;
        const response = await axios.get<VacationModel[]>(config.getAllVacationsUrl + userId);
        const vacations = response.data;
        store.dispatch(fetchVacationsAction(vacations));
        return store.getState().vacationState.vacation;
    }

    public async getOneVacation(id: number): Promise<VacationModel> {
        let vacation = store.getState().vacationState.vacation.find(v => v.vacationId === id);
        if(!vacation) {
            const response = await axios.get<VacationModel>(config.getAllVacationsUrl + id);
            vacation = response.data;
        }
        return vacation;
    }

    public async deleteOneVacation(id: number): Promise<void> {
        await axios.delete(config.getAllVacationsUrl + id);
        store.dispatch(deleteVacationAction(id));
    }

    public async addNewVacation(vacation: VacationModel): Promise<VacationModel> {

        // Convert out Vacation to FormData:
        const formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("location", vacation.location);
        formData.append("image", vacation.image.item(0));
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("price", vacation.price.toString());


        // Post the new Vacation to the server: 
        const response = await axios.post<VacationModel>(config.getAllVacationsUrl, formData);
        const addedVacation = response.data;

        // Add to redux global state: 
        store.dispatch(addVacationAction(addedVacation));

        return addedVacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

        // Convert out Vacation to FormData:
        const formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("location", vacation.location);
        formData.append("image", vacation.image.item(0));
        formData.append("startDate", vacation.startDate);
        formData.append("endDate", vacation.endDate);
        formData.append("price", vacation.price.toString());

        // Put the new Vacation to the server: 
        const response = await axios.put<VacationModel>(config.getAllVacationsUrl + vacation.vacationId, formData);
        const updatedVacation = response.data;

        // Add to redux global state: 
        store.dispatch(updateVacationAction(updatedVacation));

        return updatedVacation;

    }

    public formatDateTime(dateTime: string): string {
        const d = new Date(dateTime);

            const dateObj = new Date();

        let year = d.getFullYear();

        let month:any = d.getMonth() + 1;
        month = ('0' + month).slice(-2); 


        let date:any = d.getDate();
        date = ('0' + date).slice(-2);


      const time = `${year}-${month}-${date}`;

        return time
    }

    public async addToFollowingList(vacationID: number, id: number){
        const userId = store.getState().authState.user.userId;
        const follower: FollowerModel = {
            id: null,
            userId: userId,
            vacationId: vacationID
        }
        const response = await axios.post<FollowerModel>(config.followUrl, follower);
    }

    public async removeFollowingList(vacationId: number){
        const userId = store.getState().authState.user.userId;
  
        const response = await axios.delete<void>(config.followUrl + userId + '/' + vacationId);
    }
    
}

const vacationsService = new VacationsService();

export default vacationsService;