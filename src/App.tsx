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
import AdminBiodata from "./pages/AdminBiodata";
import AdminBiodataId from "./pages/AdminBiodataId";

function App() {
    const isLoggedIn = localStorage.getItem("access_token") !== null;
    const userInfo = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") || "{}")
        : {};
    const isAdmin = userInfo.isAdmin;

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
                            {isAdmin && (
                                <>
                                    <Route
                                        path="/biodata"
                                        element={<AdminBiodata />}
                                    />
                                    <Route
                                        path="/biodata/:id"
                                        element={<AdminBiodataId />}
                                    />
                                </>
                            )}
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
