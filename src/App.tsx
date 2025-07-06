import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddBiodata from "./pages/AddBiodata";

function App() {
    const isLoggedIn = localStorage.getItem("access_token") !== null;
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {isLoggedIn && (
                        <>
                            <Route path="/profile" element={<Profile />} />
                            <Route
                                path="/add-biodata"
                                element={<AddBiodata />}
                            />
                        </>
                    )}
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
