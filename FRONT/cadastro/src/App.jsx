import Header from "./pages/Header"

import { Outlet } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Header />
            <Outlet/>
            <p>footer</p>
        </div>
    );
}

export default App;