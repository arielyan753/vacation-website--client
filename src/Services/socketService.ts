import { io, Socket } from "socket.io-client";
import store from "../Redux/Store";
import { addVacationAction, deleteVacationAction, fetchVacationsAction, updateVacationAction } from "../Redux/VacationState";
// import MessageModel from "../Models/MessageModel";

class SocketService {

    private socket: Socket;

    public connect(): void {
        this.socket = io("http://localhost:3002");

        this.socket.on("msg-from-server-add", (addedVacation: any) => {
            // If we have a global state: 
            // Update the global state (Redux) with this message.
            // Redux will then notify all subscribers.
            
            store.dispatch(addVacationAction(addedVacation));
            // If we don't have a global state - getting a callback as an argument
            // and calling that callback:
            console.log(addedVacation); 
        });

        this.socket.on("msg-from-server-update", (updatedVacation: any) => {
            
            // If we have a global state: 
            // Update the global state (Redux) with this message.
            // Redux will then notify all subscribers.
            
            store.dispatch(updateVacationAction(updatedVacation));
            
            // If we don't have a global state - getting a callback as an argument
            // and calling that callback:
        });

        this.socket.on("msg-from-server-delete", (deleteVacation: any) => {
            
            // If we have a global state: 
            // Update the global state (Redux) with this message.
            // Redux will then notify all subscribers.
            
            store.dispatch(deleteVacationAction(deleteVacation.vacationId));
            
            // If we don't have a global state - getting a callback as an argument
            // and calling that callback:
        });
    };


    public disconnect(): void {
        this.socket.disconnect();
    }

    public send(addedVacation: any): void {
        this.socket.emit("msg-from-client-add", addedVacation);
    }

    public sendUpdate(updatedVacation: any): void {
        this.socket.emit("msg-from-client-update", updatedVacation);
    }

    public sendDelete(deletedVacation: any): void {
        this.socket.emit("msg-from-client-delete", deletedVacation);
    }

}

const socketService = new SocketService();

export default socketService;