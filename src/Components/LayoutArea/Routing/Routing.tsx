import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import Home from "../Home/Home";
import VacationList from "../../VacationArea/VacationList/VacationList";
import AddVacation from "../../VacationArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationArea/UpdateVacation/UpdateVacation";
import Graph from "../../VacationArea/Graph/Graph";

function Routing(): JSX.Element {
    return (
        <Routes>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/home" element={<Home />} />
            <Route path="/vacations" element={<VacationList />} />

            {/* Route Parameter - the ":id" is the Route Parameter
            <Route path="/products/details/:id" element={<ProductDetails />} /> */}

            {/* Handle Form: */}
            <Route path="/vacations/new" element={<AddVacation />} /> 

            {/* Update Product */}
            <Route path="/vacations/edit/:id" element={<UpdateVacation />} /> 

            <Route path="/graphs" element={<Graph />} />

            {/* <Route path="/about" element={<About />} /> */}

            {/* Default route - first way: */}
            {/* <Route path="/" element={<Home />} /> */}

            {/* Default route - second way: */}
            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="*" element={<Home />} />

        </Routes>
    );
}

export default Routing;