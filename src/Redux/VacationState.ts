import VacationModel from "../Models/VacationModel";

// vacation State - vacation data needed in the application level:
export class VacationsState {
    public vacation: VacationModel[] = [];
}

// vacation Action Type - any action which can be done on the above vacation state:
export enum VacationsActionType {
    FetchVacation = "FetchVacation",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    LogOut = "LogOut"
}

// vacation Action - any single object sent to the store during "dispatch":
export interface vacationAction {
    type: VacationsActionType;
    payload?: any;
}

// vacation Action Creators - function for creating vacationAction objects. each function creates one Action object:
export function fetchVacationsAction(vacation: VacationModel[]): vacationAction {
    return { type: VacationsActionType.FetchVacation, payload: vacation };
}
export function addVacationAction(vacation: VacationModel): vacationAction {
    return { type: VacationsActionType.AddVacation, payload: vacation };
}
export function updateVacationAction(vacation: VacationModel): vacationAction {
    return { type: VacationsActionType.UpdateVacation, payload: vacation };
}
export function deleteVacationAction(id: number): vacationAction {
    return { type: VacationsActionType.DeleteVacation, payload: id };
}
export function deleteAllVacations(): vacationAction {
    return { type: VacationsActionType.LogOut};
}

// vacation Reducer - the main function performing any action on vacation state:
// the new vacationState() is a default value for the first time only
export function vacationReducer(currentState = new VacationsState(), action: vacationAction): VacationsState {

    // Must duplicate the current state and not touch the given current state: 
    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.FetchVacation:
            newState.vacation = action.payload; // Here the payload is the vacation list.
            break;

        case VacationsActionType.AddVacation:
            const id = newState.vacation.findIndex(v => v.vacationId === action.payload.vacationId)
            if(id !== -1){
                return;
            }
            newState.vacation.push(action.payload); // Here the payload is a single object to add.
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacation.findIndex(v => v.vacationId === action.payload.vacationId); // Here the payload is a single object to update.
            if (indexToUpdate >= 0) {
                newState.vacation[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacation.findIndex(v => v.vacationId === action.payload); // Here the payload is the id to delete.
            if (indexToDelete >= 0) {
                newState.vacation.splice(indexToDelete, 1);
            }
            break;
            case VacationsActionType.LogOut:
            newState.vacation = [];
            break;
    }

    return newState;
}
