import { useEffect } from "react";
import socketService from "../../../Services/socketService";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    useEffect(() => {
        socketService.connect();
        return () => {socketService.disconnect();
    } 
    }, []);
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <aside>
            </aside>
            <main>
                <Routing />
            </main>
            <footer>
            </footer>
        </div>
    );
}

// Export this function outside of that source file:
export default Layout;
