import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import socketService from "../../../Services/socketService";
import vacationsService from "../../../Services/VacationService"
import Loading from "../../LayoutArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    // Create products state: 
    const [vacations, setVacation] = useState<VacationModel[]>([]);
    const[flag, setFlag] = useState(0);
    const role = store.getState().authState.user.role
    
    // Do side-effect once: 
    useEffect(() => {
        // socketService.connect();

        const unsubscribeMe = store.subscribe(() => {
            console.log('change test')
            const test = store.getState().vacationState.vacation; 
            console.log(test);
            setVacation([...test]);
            
        });

        vacationsService.getAllVacations()
            .then(vacations => {setVacation(vacations)
                console.log(vacations);
                ;
            })
            .catch(err => notify.error(err));
        
            return () => {
                unsubscribeMe();} 

    }, [flag]);

    function handleFlagChange(){
        if(flag === 0){
            setFlag(1)
        }
        else{
            setFlag(0)
        }
    
        }


    return (
        <div className="VacationList">

                <div className="add-btn">
                
                {(role === 'Admin') ? <NavLink to={'/vacations/new'} ><button className="btn btn-success">Add vacation</button></NavLink> : <></>} &nbsp;
                {(role === 'Admin') ? <NavLink to={'/graphs'} ><button className="btn btn-primary">Graphs <a><i className="fas fa-chart-line"></i></a></button></NavLink>  : <></>}
        
            </div>
            <br />
            
            <div className="container">
            {vacations.length === 0 ? <Loading /> : <></>}

            {vacations.map(v => <VacationCard key={v.vacationId} vacationProp={v} flagFunc={handleFlagChange} />)}
            </div>

        </div>
    );
}

export default VacationList;
