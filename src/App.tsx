import './App.css';
import Toolbar from "./components/Toolbar/Toolbar.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.tsx";

const App = () => {
    return (
        <>
            <header className="mb-5">
                <Toolbar />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shows/:id" element={<Home />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
